<?php
/**
 * Peptide.php
 * 
 * This file contains the peptide class which, when implemented represents a single peptide
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.2
 * @package mpimp.phprot
 * @subpackage 
 */

/**
 * This class represents a single peptide
 * 
 * Usage:
 * <code>
 * $pep = new Peptide();
 * $pep->Sequence = 'HGYIGEFEYVDDHR';
 * $pep->NTerminus = 'H';
 * $pep->CTerminus = 'OH';
 * $ct = $pep->getCTerminusMass('monoisotopic');
 * $nt = $pep->getNTerminusMass('monoisotopic');
 * $pepmass = $pep->getMass('monoisotopic'); //Retrieves the calculated uncharged mass
 * $mcr = $pep->getTheoreticalMCR('monoisotopic', 2); //Retrieves the calculated m/z with charge = 2
 * </code>
 * 
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.2
 * @package mpimp.phprot
 * @subpackage 
 */
class Peptide extends XProtBase
{
	public $Sequence = '';
	public $NTerminus = '';
	public $CTerminus = '';
	
	//###################################################################
	/**
	 * The class constructor
	 * @param object $config[optional] The configuration object
	 * @cfg sequence The peptide sequence
	 */
	public function __construct($config = null)
	{
		if (is_null($config) || !is_array($config)) {
			$config = array(
				'sequence' => ''
			);
		}
		
		$this->Sequence = array_key_exists('sequence', $config) ? $config['sequence'] : $this->Sequence;
	}
	
	//###################################################################
	/**
	 * Retrieves the mass of an amino acid in sequence specified by index
	 * @param string $weighttype The weighttype to use (monoisotopic or average)
	 * @param int $index The zero-based index of the amino acid in the sequence
	 * @return int Either the monoisotopic or the average mass of the peptide
	 */
	public function getIndexMass($weighttype, $index)
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
		$strAa = '';
		
		if ($index >= strlen($this->Sequence)) {
			$this->toLog('error', $loc, 'Index out of bounds', 'Specified index is out of sequence bounds.', '');
			return -1;
		}
		$strAa = substr($this->Sequence, $index, 1);
		
		return $this->getAminoAcidMass($strAa, $weighttype);
	}
	
	//###################################################################
	/**
	 * Retrieves the theoretical mass / z 
	 * @param string $weighttype The weight type to use for calculation (monoisotopic or average)
	 * @param int $charge The charge (z) to use for calculation
	 * @return double The theoretical mass or -1 on error
	 */
	public function getTheoreticalMCR($weighttype, $charge)
	{
		$dblPepMass = $this->getMass($weighttype);
		return ($dblPepMass+1) / $charge;
	}
	
	//###################################################################
	/**
	 * Retrieves the mass of the C-Terminus 
	 * @param string $weighttype The weighttype to use for calculation (monoisotopic or average)
	 * @return double The mass of the C-Terminus or -1 on error
	 */
	public function getCTerminusMass($weighttype)
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
	
		if ($this->CTerminus !== '') {
			return $this->getFormulaMass($this->CTerminus, $weighttype);
		}
		$this->toLog('error', $loc, 'CTerminus not set', 'Failed to calculate the CTerminus mass. CTerminus not set.', '');
		return -1;
	}
	
	//###################################################################
	/**
	 * Retrieves the calculated mass of this peptide
	 * @param string $weighttype The weighttype to use for calculation (monoisotopic or average)
	 * @return double The theoretical peptide mass or -1 on error
	 */
	public function getMass($weighttype)
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
	
		$dblMass = 0;
		$dblTempMass = 0;
		$strAa = '';
		
		if (!isset($this->Sequence) || $this->Sequence === '') {
			return 0;
		}
		
		//-- Terminus masses --
		if ($this->NTerminus !== '') {
			$dblTempMass = $this->getFormulaMass($this->NTerminus, $weighttype);
			if ($dblTempMass === -1) {
				$this->toLog('error', $loc, 'Method error', 'Method (this.getFormulaMass) failed to complete successfully for NTerminus: '+$this->NTerminus, '');
				return -1;
			}
			$dblMass += $dblTempMass;
		}
		if ($this->CTerminus !== '') {
			$dblTempMass = $this->getFormulaMass($this->CTerminus, $weighttype);
			if ($dblTempMass === -1) {
				$this->toLog('error', $loc, 'Method error', 'Method (this.getFormulaMass) failed to complete successfully for CTerminus: '+$this->CTerminus, '');
				return -1;
			}
			$dblMass += $dblTempMass;
		}
		
		//-- Amino acids --
		for ($i=0,$j=strlen($this->Sequence); $i<$j; $i++) {
			$strAa = $this->Sequence[$i];
			$dblTempMass = $this->getIndexMass($weighttype, $i);
			$dblMass += $dblTempMass;
		}
		
		return $dblMass;
	}
	
	/**
	 * Retrieves the molar extinction coefficent (molar absorption coefficent)
	 * It is based on: http://pubs.acs.org/doi/abs/10.1021/jf070337l?prevSearch=kuipers&searchHistoryKey=
	 * @return The MEC or -1 on error
	 */
	public function getMec()
	{
		if (!isset($this->Sequence) || $this->Sequence === '') {
			return -1;
		}
		
		$intCoefPeptide = 923 * strlen(trim($this->Sequence));
		
		$intSumCoefAA = 0;
		$arrCountChars = count_chars($this->Sequence, 1);
		foreach ($arrCountChars as $intChar => $intCount)
		{
			$strChar = chr($intChar);
			if (strtolower($strChar) === 'p' && strtolower(substr($this->Sequence, 0, 1)) === 'p') {
				$intAACoef = 30 * 1; //P1 = 30
				$intSumCoefAA += $intAACoef;
				$intAACoef = $arrExtCoef[$strChar] * ($intCount-1);
				$intSumCoefAA += $intAACoef;
			} else {
				$intAACoef = $arrExtCoef[$strChar] * $intCount;
				$intSumCoefAA += $intAACoef;
			}
		}
		
		$intCoef = $intCoefPeptide + $intSumCoefAA;
		return $intCoef;
	}
	
	//###################################################################
	/**
	 * Retrieves the mass of the N-Terminus
	 * @param string $weighttype The weighttype to use for calculation (monoisotopic or average)
	 * @return double The mass of the N-Terminus or -1 on error
	 */
	public function getNTerminusMass($weighttype)
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
	
		if ($this->NTerminus !== '') {
			return $this->getFormulaMass($this->NTerminus, $weighttype);
		}
		$this->toLog('error', $loc, 'NTerminus not set', 'Failed to calculate the NTerminus mass. NTerminus not set.', '');
		return -1;
	}
	
	//###################################################################
	/**
	 * Validates a sequnece (checks for non amino-acids and special characters)
	 * @param String $sequence The sequence to check for validation
	 * @return bool True if the sequence is valid, false else
	 */
	public function validateSequence($sequence)
	{
		if(preg_match("/[^ARNDCEQGHILKMFPSTWYV]/", $sequence)) {
			return false;
		}
		
		return true;
	}
}

/* End of file Peptide.php */
/* Location: ./xprot/phprot/Peptide.php */ 