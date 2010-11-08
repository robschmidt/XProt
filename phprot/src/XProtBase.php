<?php
/**
 * XProtBase.php
 * 
 * This file contains the base class to be extended by all XProt classes
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.3
 * @package mpimp.phprot
*/

/**
 * The base class to be extended by all XProt classes
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.3
 * @package mpimp.phprot
*/
class XProtBase
{
	//###################################################################
	/**
	 * Calculates the mass of the element in a chemical formula such as NH3
	 * 
	 * Example:
	 * <code>
	 * $xp = new XProtBase();
	 * mass = $xp->getFormulaMass('H2O', 'average'); //Retrieves the average mass of water (H2O)
	 * </code>
	 * 
	 * @param string $formula The formula to calculate the mass of its elements
	 * @param string $weighttype The weight type to return (monoisotopic or average)
	 * @return float The molecular mass of the formulas elements or -1 on error
	 */
	public function getFormulaMass($formula, $weighttype)
	{		
		$loc = basename(__FILE__).'/'.__METHOD__;
	
		$dblElMass = 0;		//The elements mass
		$dblFormulaMass = 0;
		$intElMult = 0;		//The elements multiplier
		$intLength = 0;		//A helper var to get an elements multiplier
		$strEl = '';		//A single element in formula
		$strTemp = '';		//A helper var to get an elements multiplier
		
		if (!$formula || strval($formula) === '') {
			return -1;
		}
		
		//--- Calculate the mass for the given element ---
		for ($i=0,$j=strlen($formula); $i<$j; $i++) {
			
			//-- Elements mass --
			$strEl = strtoupper(substr($formula, $i, 1));
			$dblElMass = $this->getElementMass($strEl, $weighttype);
			if ($dblElMass === -1) {
				$this->toLog('error', $loc, 'Method error', 'Method ($this->getElementMass) failed to complete successfully.', '');
				return -1;
			}
			
			//-- Calculate the elements multiplier --
			if($i+2 <= strlen($formula) && is_numeric(substr($formula, $i+1, 1))) {
				$intLength = 1;
				$strTemp = substr($formula,$i+$intLength, 1);
				while(is_numeric($strTemp) && $i+$intLength <= strlen($formula)){
					$intLength++;
					$strTemp = substr($formula,$i+$intLength, 1);
				}
				$intElMult = intval(substr($formula, $i+1, $intLength-1));
				if ($intElMult === 0) {
					$this->toLog('error', $loc, 'Not a number', 'The elements ('.$strEl.') multiplier is not a number: '.strval($intElMult), '');
					return -1;
				}
				$i += $intLength-1;
			}
			else{
				$intElMult = 1;
				$intLength = 0;
			}
	
			$dblFormulaMass += $intElMult * $dblElMass;
		}
		return $dblFormulaMass;
	}
	
	//###################################################################
	/**
	 * Retrieves the mass of an amino acid specified by id or shortcut
	 * 
		switch ($weighttype) {
			case 'monoisotopic' :return $a['weight_monoiso'];
			case 'average' : return $a['weight_ave'];
			default : $this->toLog('error', $loc, 'Unknown weighttype', 'Weighttype ('.$weighttype.') is unknown.', ''); return -1;
		}
		
		
	 * Example:
	 * <code>
	 * $xp = new XProtBase();
	 * $mass = $xp->getAminoAcidMass('A', 'monoisotopic'); //Retrieves the monoisotopic mass of alanine
	 * </code>
	 * 
	 * @param string $aminoacid The aminoacids id or shortcut
	 * @param string $weighttype The weighttype to return the mass of
	 * @return float The amino acids mass or -1 on error
	 */
	public function getAminoAcidMass($aminoacid, $weighttype)
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
		
		if (!array_key_exists($aminoacid, Constants::$AminoAcids)) {
			return -1;
		}
		
		$a = Constants::$AminoAcids[$aminoacid];		
		switch ($weighttype) {
			case 'monoisotopic' :return $a['weight_monoiso'];
			case 'average' : return $a['weight_ave'];
			default : $this->toLog('error', $loc, 'Unknown weighttype', 'Weighttype ('.$weighttype.') is unknown.', ''); return -1;
		}
		
		return -1;
	}
	
	//###################################################################
	/**
	 * Retrieves the molar extinction coefficent of an amino acid specified by id or shortcut
	 * 
	 * Example:
	 * <code>
	 * $xp = new XProtBase();
	 * $mec = $xp->getAminoAcidMec('A'); //Retrieves the monoisotopic mass of alanine
	 * </code>
	 * 
	 * @param string $aminoacid The aminoacids id or shortcut
	 * @return float The amino acids molar extinction coefficent or -1 on error
	 */
	public function getAminoAcidMec($aminoacid)
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
		
		if (!array_key_exists($aminoacid, Constants::$AminoAcids)) {
			return -1;
		}
		
		$a = Constants::$AminoAcids[$aminoacid];		
		return $a['mec'];
	}
	
	//###################################################################
	/**
	 * Retrieves the mass of an element specified by id or shortcut
	 * 
	 * Example:
	 * <code>
	 * $xp = new XProtBase();
	 * $mass = $xp->getElementMass('O', 'monoisotopic'); //Retrives the monoisotopic mass of oxygen
	 * </code>
	 * 
	 * @param string $element The elements id or shortcut
	 * @param string $weighttype The weighttype to return the element mass of
	 * @return float The amino acids mass or -1 on error
	 */
	public function getElementMass($element, $weighttype)
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
		
		if (!array_key_exists($element, Constants::$Elements)) {
			return -1;
		}
		
		$a = Constants::$Elements[$element];		
		switch ($weighttype) {
			case 'monoisotopic' :return $a['weight_monoiso'];
			case 'average' : return $a['weight_ave'];
			default : $this->toLog('error', $loc, 'Unknown weighttype', 'Weighttype ('.$weighttype.') is unknown.', ''); return -1;
		}
		
		return -1;
	}
	
	//###################################################################
	/**
	 * Retrieves the mass of an physics element specified by id or shortcut
	 * 
	 * Example:
	 * <code>
	 * $xp = new XProtBase();
	 * $mass = $xp->getPhysicsMass('P', 'monoisotopic'); //Retrives the monoisotopic mass of a proton
	 * </code>
	 * 
	 * @param string $physics The physics elements id or shortcut
	 * @param string $weighttype The weighttype to return the element mass of
	 * @return float The physics mass or -1 on error
	 */
	public function getPhysicsMass($physics, $weighttype)
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
		
		if (!array_key_exists($physics, Constants::$Physics)) {
			return -1;
		}
		
		$a = Constants::$Physics[$physics];		
		switch ($weighttype) {
			case 'monoisotopic' :return $a['weight_monoiso'];
			case 'average' : return $a['weight_ave'];
			default : $this->toLog('error', $loc, 'Unknown weighttype', 'Weighttype ('.$weighttype.') is unknown.', ''); return -1;
		}
		
		return -1;
	}
	
	//###################################################################
	/**
	 * Retrieves an modification object by accession
	 * @param string $accession The accession of the modification
	 * @return mixed The modification object
	 */
	public function getModification($accession)
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
		
		if (!array_key_exists(strval($accession), Constants::$Modifications)) {
			return null;
		}
		
		$a = Constants::$Modifications[strval($accession)];
		return $a;
	}
	
	//###################################################################
	/**
	 * Retrieves the mass of an element specified by id or shortcut
	 * @param string $accession The accession of the modification
	 * @param string $sequence The sequence
	 * @param string $weighttype The weighttype to return the element mass of
	 * @return float The amino acids mass or -1 on error
	 */
	public function getModificationMass($accession, $aminoacid, $position, $weighttype)
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
		
		$o = $this->getModification($accession);
		
		if ($o['mod_type'] === 'addition') {
			switch ($weighttype) {
				case 'monoisotopic':
					return $o['weight_monoiso'];
				case 'average':
					return $o['weight_ave'];
				default:
					$this->toLog('error', $loc, 'Unknown weighttype', 'Weighttype ('.$weighttype.') is unknown.', '');
					return -1;
			}
		}
		
		if ($o['mod_type'] === 'subtraction') {
			switch ($weighttype) {
				case 'monoisotopic':
					return $o['weight_monoiso'] * (-1);
				case 'average':
					return $o['weight_ave'] * (-1);
				default:
					$this->toLog('error', $loc, 'Unknown weighttype', 'Weighttype ('.$weighttype.') is unknown.', '');
					return -1;
			}
		}
		
		if ($o['mod_type'] === 'function') {
			$c = new Constants();
			return $c->execModFunction($o['mod_function'], $aminoacid, $position);
		}	
			
		return -1;
	}
	
	//###################################################################
	/**
	 * Adds an entry to the internal log
	 * @param string $type The log type (error, message, action)
	 * @param string $location The trigger location
	 * @param string $title The title of the log entry
	 * @param string $body The body of the log entry
	 * @param string $number The id of the log entry
	 * @protected
	 */
	protected function toLog($type, $location, $title, $body, $number)
	{
		print('ERROR in'.$location.': '.$title.' - '.$body);
	}
	
}

/* End of file XProtBase.php */
/* Location: ./xprot/phprot/XProtBase.php */ 