<?php
/**
 * ModifiedPeptide.php
 * 
 * This file contains the ModifiedPeptide class which, when implemented represents a single Peptide with modifications
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.2
 * @package mpimp.phprot
 * @subpackage 
 */

/**
 * This class represents a single peptide with modifications
 * 
 * How to use this class:
 * <code>
 * //Example 1
 * $modpep = new ModifiedPeptide();
 * $modpep->Sequence = 'ITLLEELQEKTEEDEENKPSVIEK';
 * $modpep->NTerminus = 'H';
 * $modpep->CTerminus = 'OH';
 * 
 * //Add modifications manually
 * $modpep->addModification(array(
 *  'accession' => 21,
 *  'position' => 1
 * ),array(
 *  'accession' => 21,
 *  'position' => 10
 * ));
 * 
 * //Example 2
 * $modpep = new ModifiedPeptide();
 * $modpep->NTerminus = 'H';
 * $modpep->CTerminus = 'OH';
 * $modpep->setModifiedSequence('KDEPAEE(pS)DGDLGFGLFD'); //Let the object parse the sequence to determine the modifications, see constants for markers
 * 
 * //Example 3
 * $modpep = new ModifiedPeptide();
 * $modpep->NTerminus = 'H';
 * $modpep->CTerminus = 'OH';
 *  
 * </code>
 * 
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.2
 * @package mpimp.phprot
 * @subpackage 
 */
class ModifiedPeptide extends Peptide
{
	public $Modifications = array();
	
	
	//###################################################################
	/**
	 * Adds 15N modifications for all amino acids
	 */
	public function add15NModifications()
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
		$strAa = '';
		
		if (!isset($this->Sequence) || $this->Sequence === '') {
			$this->toLog('error', $loc, 'Sequence not set', 'Failed to add 15N modifications. Sequence not set yet.', '');
			return;
		}
		
		for ($i=0,$j=strlen($this->Sequence); $i<$j; $i++) {
			$strAa = $this->Sequence[$i];
			$this->addModification(array(
				'accession' => 99000,
				'position' => $i
			));
		}
	}
	
	//###################################################################
	/**
	 * Adds a modification to the peptide
	 * @param array $modification The modification assoc array with the following entries:
	 * accession: The modifications accession number
	 * position: The position of the modified amino acid starting with 0
	 */
	public function addModification($modification)
	{
		$this->Modifications[] = $modification;
	}
	
	//###################################################################
	/**
	 * Retrieves the index mass including all modifications
	 * @param string $weighttype The weighttype to use for masses
	 * @param int $index The index of the amino acid in sequence
	 * @return float The total mass of the amino acid including all modifications
	 */
	public function getIndexMass($weighttype, $index)
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
		$arrModifications;
		$dblAddMass = 0;
		$dblMass = 0;
		$objMod = null;
		$strAa = '';
		
		if (!isset($this->Sequence) || $this->Sequence === '') {
			$this->toLog('error', $loc, 'Sequence not set', 'Failed to get modification for index. Sequence not set yet.', '');
			return;
		}
		if ($index >= strlen($this->Sequence)) {
			$this->toLog('error', $loc, 'Index out of bounds', 'Specified index is out of sequence bounds.', '');
			return -1;
		}
		
		$strAa = substr($this->Sequence, $index, 1);
		$dblMass = parent::getIndexMass($weighttype, $index);
		$arrModifications = $this->getIndexModifications($index,$weighttype);
		
		for ($i=0, $j=count($arrModifications); $i<$j; $i++) {
			$objMod = $arrModifications[$i];
			$dblAddMass += $this->getModificationMass($objMod['accession'], $strAa, $index, $weighttype);
		}
		
		return $dblMass+$dblAddMass;
	}
	
	//###################################################################
	/**
	 * Retrieves all modifications of an amino acid specified by index in sequence
	 * @param int $index The index of the amino acid in sequence
	 * @param string $weighttype The weighttypeof the modification mass to retrieve
	 * @return Returns an array of modification objects
	 */
	public function getIndexModifications($index, $weighttype)
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
		$arrReturn = array();
		$intAcc = 0;
		$strAa = '';
		
		if (!isset($this->Sequence) || $this->Sequence === '') {
			$this->toLog('error', $loc, 'Sequence not set', 'Failed to get modification for index. Sequence not set yet.', '');
			return;
		}
		if ($index >= strlen($this->Sequence)) {
			$this->toLog('error', $loc, 'Index out of bounds', 'Specified index is out of sequence bounds.', '');
			return -1;
		}
		$strAa = substr($this->Sequence, $index, 1);
		
		for ($i=0, $j=count($this->Modifications); $i<$j; $i++) {
			if ($this->Modifications[$i]['position'] === $index) {
				$intAcc = $this->Modifications[$i]['accession'];
				$objMod = $this->getModification($intAcc);
				$objMod['aminoacid'] = $strAa;
				$objMod['weighttype'] = $weighttype;
				$objMod['index'] = $index;
				$arrReturn[] = $objMod;
			}
		}
		
		return $arrReturn;
	}
	
	//###################################################################
	/**
	 * Use this method to parse a sequence with included modification marks in order to get the naked sequence as well as all of the modifications.
	 * @param string $modifiedsequence The modified sequence
	 * @return bool True if successully processed, false else. If method finish without errors, the Sequence attribute will be set 
	 * and the the modifications added
	 */
	public function setModifiedSequence($modifiedsequence)
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
		$strModSeqAcc = $modifiedsequence;
		
		$arrModFlags = Constants::$ModificationFlags;
		foreach ($arrModFlags as $oFlag) {
			$strFlag = $oFlag['flag'];
			$strRg = $oFlag['regexpattern'];
			$numAcc = $oFlag['accession'];
			$strTarget = $oFlag['target'];
			$strModSeqAcc = ereg_replace($strRg, 'Xacc:'.strval($numAcc).',aa:'.$strTarget.'X', $strModSeqAcc);
		}
		
		$intPos = strpos($strModSeqAcc, 'Xacc:');
		$intEndPos = 0;	
		while ($intPos > -1) {
			$intEndPos = strpos($strModSeqAcc, 'X', $intPos+3)+1;
			if ($intEndPos === -1) {
				$this->Modifications = array(); //Cleanup
				$this->toLog('error', $loc, 'End tag missing', 'Parse error: Modifications end tag (X) is missing.', '');
				return false;
			}
			$strTag = substr($strModSeqAcc, $intPos, $intEndPos-$intPos);
			$strAcc = substr($strTag, 5, strpos($strTag, ',')-5);
			$numAcc = intval($strAcc);
			$strTarget = substr($strTag, strpos($strTag, ',aa:')+4, (strlen($strTag)-1) - (strpos($strTag, ',aa:')+4));
			if (!is_numeric($strAcc)) {
				$this->Modifications = array(); //Cleanup
				$this->toLog('error', $loc, 'Invalid accession', 'Parse error: Accession is not of type number.', '');
				return false;
			}
			
			$this->addModification(array(
				'accession' => $numAcc,
				'position' => $intPos
			));
		
			$strModSeqAcc = substr_replace($strModSeqAcc, $strTarget, $intPos, $intEndPos-$intPos);
			$intPos = strpos($strModSeqAcc, 'Xacc:');
		}
		
		$blnCheck = $this->validateSequence($strModSeqAcc);
		if ($blnCheck !== true) {
			$this->Modifications = array(); //Cleanup
			$this->toLog('error', $loc, 'Invalid peptide sequence', 'Parse error: Validation of naked sequence failed: '.$strModSeqAcc, '');
			return false;
		}
		
		$this->Sequence = $strModSeqAcc;
		return true;
	}
		
	
}

/* End of file ModifiedPeptide.php */
/* Location: ./xprot/phprot/ModifiedPeptide.php */ 