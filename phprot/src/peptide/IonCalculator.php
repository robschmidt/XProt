<?php
/**
 * IonCalculator.php
 * 
 * This file contains the IonCalculator class which provides functionality to calculate the ions as measured in masspec
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.2
 * @package mpimp.phprot
 * @subpackage peptide
 */


/**
 * The IonCalculator class provides functionality to calculate the ions as measured in masspec
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.1
 * @package mpimp.phprot
 * @subpackage peptide
 */
class IonCalculator extends XProtBase
{
	private $_leftStartIons = array('a', 'b', 'c', 'd');
	private $_rightStartIons = array('v', 'w', 'x', 'y', 'z');
	private $_tempArray = array();
	
	/**
	 * @var mixed The peptide object to use for ion calculation
	 */
	public $peptide = null;
	
	/**
	 * @var int The maximum charge to calculate
	 */
	public $maxcharge = 1;
	
	/**
	 * @var string The weighttype to use for constants (either monoisotopic or average)
	 */
	public $weighttype = 'monoisotopic';
	
	/**
	 * @var array An array of neutral loss formulas to calculate the ion masses of such as H2O or NH3
	 */
	public $neutralloss = array();
	
	/**
	 * @var array An array of neutral gain formulas to calculate the ion masses of such as H2O
	 */
	public $neutralgain = array();
	
	/**
	 * @var mixed A template to fill the custom property of the result. Can be either a string or a template object. 
	 * The template object must contain a method "apply" which takes an associative array with keys mass, ion, index, 
	 * charge, flag to be applied to the template. The rendered string must be returned from this function.
	 */
	public $customtemplate = null;
	
	/**
	 * @var True to return only a flat array with custom values
	 */
	public $customonly = false;
	
	
	//###################################################################
	/**
	 * Adds an object to the result array
	 * @param int $mass The ion mass
	 * @param string $ion The ion
	 * @param int $ionindex The ion index
	 * @param int $charge The chargestate
	 * @param string $flag A flag for additional information such as neutral losses
	 */
	private function _addToResult($mass, $ion, $ionindex, $charge, $flag)
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
		$strCustom = '';
		$objEntry = array(
			'mass' => $mass,
			'ion' => $ion,
			'index' => $ionindex,
			'charge' => $charge,
			'flag' => $flag
		);
		
		if (isset($this->customtemplate)) {
			if (is_string($this->customtemplate)) {
				$strCustom = $this->customtemplate;
				$strCustom = str_replace('{mass}', $objEntry['mass'], $strCustom);
				$strCustom = str_replace('{ion}', $objEntry['ion'], $strCustom);
				$strCustom = str_replace('{index}', $objEntry['index'], $strCustom);
				$strCustom = str_replace('{charge}', $objEntry['charge'], $strCustom);
				$strCustom = str_replace('{flag}', $objEntry['flag'], $strCustom);
			} else {
				if (method_exists($this->customtemplate, 'apply')) {
					$strCustom = $this->customtemplate->apply($objEntry);
				} else {
					$this->toLog('error', $loc, 'Invalid template object', 'The provided template object does not contain an apply method.', '');
				}
			}
		}
		$objEntry['custom'] = $strCustom;
		$this->_tempArray[] = $objEntry;
	}
	
	//###################################################################
	/**
	 * Calculates and adds the neutral loss/gain masses to result array
	 * @param string $strAa The current amino acid
	 * @param string $ion The ion currently calculated
	 * @param int $intIndex The current sequence index
	 * @param int $charge The current charge
	 */
	private function _addNeutralLossGainMasses($strAa, $dblMass, $ion, $ionindex, $charge)
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
		$dblElH = $this->getElementMass('H', $this->weighttype);
		$dblElN = $this->getElementMass('N', $this->weighttype);
		$dblElO = $this->getElementMass('O', $this->weighttype);
		
		$blnGainH2O = in_array('H2O', $this->neutralgain, true);
		$blnGainNH3 = in_array('NH3', $this->neutralgain, true);
		$blnLossH2O = in_array('H2O', $this->neutralloss, true);
		$blnLossNH3 = in_array('NH3', $this->neutralloss, true);		
		
		
		switch($ion){
			case 'a' :
				if ($blnLossNH3 === true && ($strAa === 'K' || $strAa === 'N' || $strAa === 'Q' || $strAa === 'R')) {
					$dblMass =  $dblMass - ($dblElN + ($dblElH * 3));
					$strFlag = '-NH3';
					$this->_addToResult($dblMass, $ion, $ionindex, $charge, $strFlag);
				}
				return true;
	
			case 'b':
				if ($blnLossNH3 === true && ($strAa === 'K' || $strAa === 'N' || $strAa === 'Q' || $strAa === 'R')) {
					$dblMass =  $dblMass - ($dblElN + ($dblElH * 3));
					$strFlag = '-NH3';
					$this->_addToResult($dblMass, $ion, $ionindex, $charge, $strFlag);
				}
				if ($blnLossH2O === true && ($strAa === 'D' || $strAa === 'E' || $strAa === 'S' || $strAa === 'T')) {
					$dblMass =  $dblMass - ($dblElO + ($dblElH * 2));
					$strFlag = '-H2O';
					$this->_addToResult($dblMass, $ion, $ionindex, $charge, $strFlag);
				}
				if ($blnGainH2O === true && ($strAa === 'H' || $strAa === 'K' || $strAa === 'N' || $strAa === 'R')) {
					$dblMass =  $dblMass + ($dblElO + ($dblElH * 2));
					$strFlag = '+H2O';
					$this->_addToResult($dblMass, $ion, $ionindex, $charge, $strFlag);
				}
				if($blnGainH2O === true && $blnLossNH3 === true && ($strAa === 'K' || $strAa === 'N' || $strAa === 'R')) {
					
					$dblMass = $dblMass + $dblElO - $dblElN + $dblElH;
					$strFlag = '+H2O -NH3';
					$this->_addToResult($dblMass, $ion, $ionindex, $charge, $strFlag);
				}
				return true;
	
			case 'y':
				if ($blnLossNH3 === true && ($strAa === 'K' || $strAa === 'N' || $strAa === 'Q' || $strAa === 'R')) {
					$dblMass =  $dblMass - ($dblElN + ($dblElH * 3));
					
					$strFlag = '-NH3';
					$this->_addToResult($dblMass, $ion, $ionindex, $charge, $strFlag);
				}
				if ($blnLossH2O === true && ($strAa === 'D' || $strAa === 'E' || $strAa === 'S' || $strAa === 'T')) {
					$dblMass =  $dblMass - ($dblElO + ($dblElH * 2));
					$strFlag = '-H2O';
					$this->_addToResult($dblMass, $ion, $ionindex, $charge, $strFlag);
				}
				return true;
		}
		
		return true;
	}
	
	//###################################################################
	/**
	 * Calculates the ion modifier mass
	 * @param string $strAa The amino acid to get the ion modifier of
	 * @param string $ion The ion to retrieve the modifier mass of
	 * @return A mass to be added/substracted to/from the amino acid mass
	 */
	private function _getIonModifierMass($strAa, $ion)
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
		$dblTemp = 0;
		
		$dblAaMass = $this->getAminoAcidMass($strAa, $this->weighttype);
		$dblElC = $this->getElementMass('C', $this->weighttype);
		$dblElH = $this->getElementMass('H', $this->weighttype);
		$dblElN = $this->getElementMass('N', $this->weighttype);
		$dblElO = $this->getElementMass('O', $this->weighttype);
		$dblElS = $this->getElementMass('S', $this->weighttype);
	
		switch($ion) {
			case 'a': return (-1) * ($dblElC + $dblElO + $dblElH);
			case 'b': return (-1) * $dblElH;
			case 'c': return $dblElN + ($dblElH * 2);
			case 'd':
				$dblTemp = (-1) * $dblAaMass;
				if ($strAa === 'K' || $strAa === 'N' || $strAa === 'R') {
					return $dblTemp + $dblElN + (($dblElC * 2) + ($dblElH * 4));
				} else {
					return 0;
				}
			case 'v':
				$dblTemp = (-1) * $dblAaMass;
				if ($strAa === 'H' || $strAa === 'K' || $strAa === 'N' || $strAa === 'R') {
					return $dblTemp + ($dblElC * 2) + ($dblElH * 2) + $dblElN + $dblElO;
				} else {
					return 0;
				}
	
			case 'w':
				$dblTemp = (-1) * $dblAaMass;
				if ($strAa === 'K' || $strAa === 'N' || $strAa === 'R') {
					return $dblTemp + ($dblElC * 3) + ($dblElH * 3) + $dblElO;
				} else {
					return 0;
				}
	
			case 'x': return $dblElC + $dblElO - $dblElH; 
			case 'y': return $dblElH;
			case 'z': return (-1) * ($dblElN + $dblElH);
			default: break;
		}
		
		$this->toLog('error', $loc, 'Unknown ion', 'Failed to calculate the ions modifier mass. Ion ('+$ion+') unknown.', '');
		return -1;
	}
	
	//###################################################################
	/**
	 * Process a single amino acid
	 * @param string} strAa The amino acid to process
	 * @param float dblCurrentMass The overall mass so far
	 * @param string ion The ion to calculate
	 * @param int ionindex The ion index beginning with 1 no matter of left or right starting
	 * @param int index The true zero-based index of the current amino acid
	 * @return float The plain amino acid mass to be added to the overall mass
	 */
	private function _processAminoAcid($strAa, $dblCurrentMass, $ion, $ionindex, $index)
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
		
		$dblIonModifier = 0;
		$dblMassTemp = 0;
		$dblMassBase = 0;
		$intMaxCharge = $this->maxcharge;
		$j = 0;
		$dblProtonMass = $this->getPhysicsMass('P', $this->weighttype);
		$dblMassNeutralLG = 0;
		$dblAaMass = 0;
		
		$dblAaMass = $this->peptide->getIndexMass($this->weighttype, $index); //Retrieves the amino acid + modifications
		$dblCurrentMass += $dblAaMass;
		
		$dblIonModifier = $this->_getIonModifierMass($strAa, $ion);
		if ($dblIonModifier === -1) {
			$this->toLog('error', $loc, 'Method error', 'Method ($this->_getIonModifierMass) failed to complete successfully.', '');
			return false;
		}
		
		//-- Fix maxcharge for leading and trailing amino acids --
		if ($ionindex < $intMaxCharge) {
			$intMaxCharge = $ionindex;
		}
		
		$dblMassBase = $dblCurrentMass + $dblIonModifier;
		for ($i=1; $i <= $intMaxCharge; $i++) {
			
			//-- Base charged ($i) mass --
			$dblMassBase += $dblProtonMass;
			$dblMassTemp = $dblMassBase / $i;
			$this->_addToResult($dblMassTemp, $ion, $ionindex, $i, '');
			
			//-- Neutral loss/gain masses --
			$this->_addNeutralLossGainMasses($strAa, $dblMassTemp, $ion, $ionindex, $i);
		}
		
		return $dblAaMass;
	}
	
	//###################################################################
	/**
	 * The class constructor
	 * @param object $config The configuration object
	 * @cfg peptide The peptide object to use for ion calculation
	 * @cfg maxcharge The maximum charge to calculate
	 * @cfg weighttype The weighttype to use for constants (either monoisotopic or average)
	 * @cfg neutralloss An array of neutral loss formulas to calculate the ion masses of such as H2O or NH3
	 * @cfg neutralgain An array of neutral gain formulas to calculate the ion masses of such as H2O
	 * @cfg customtemplate A template to fill the custom property of the result. Can be either a string or a template object. 
	 * The template object must contain a method "apply" which takes an associative array with keys mass, ion, index, 
	 * $charge, flag to be applied to the template. The rendered string must be returned from this function.
	 * @cfg customonly True to return only a flat array with custom values
	 */
	public function __construct($config)
	{
		if (!isset($config)) {
			$config = array();
		}
		
		//-- Apply config values to this --
		$this->peptide = array_key_exists('peptide', $config) ? $config['peptide'] : $this->peptide;
		$this->maxcharge = array_key_exists('maxcharge', $config) ? $config['maxcharge'] : $this->maxcharge;
		$this->weighttype = array_key_exists('weighttype', $config) ? $config['weighttype'] : $this->weighttype;
		$this->neutralloss = array_key_exists('neutralloss', $config) ? $config['neutralloss'] : $this->neutralloss;
		$this->neutralgain = array_key_exists('neutralgain', $config) ? $config['neutralgain'] : $this->neutralgain;
		$this->customtemplate = array_key_exists('customtemplate', $config) ? $config['customtemplate'] : $this->customtemplate;
		$this->customonly = array_key_exists('customonly', $config) ? $config['customonly'] : $this->customonly;		
	}
	
	//###################################################################
	/**
	 * Calculate all masses for specified ion
	 * @param string $ion The ion to calculate the masses of (a,b,c,d,v,w,x,y,z)
	 * @return array An array of assoc arrays describing the ions e.g. 
	 * array(array('mass' => 124.54, 'ion' => 'b1', 'charge' => 2, 'flag' => '-H2O'),array(...),...)
	 */
	public function calculateIon($ion)
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
		
		$this->_tempArray = array();
		$dblCurrentMass = 0;
		$strAa = '';
		$strSeq = $this->peptide->Sequence;
		$i;
		
		if(in_array($ion, $this->_leftStartIons)) {
			$dblCurrentMass = $this->peptide->getNTerminusMass($this->weighttype);
			
			for($i=0,$j=strlen($strSeq)-1; $i<$j; $i++) {
				$strAa = $strSeq[$i];
				$dblCurrentMass += $this->_processAminoAcid($strAa, $dblCurrentMass, $ion, $i+1, $i);
			}
		}
		
		if(in_array($ion, $this->_rightStartIons)) {
			$dblCurrentMass = $this->peptide->getCTerminusMass($this->weighttype);
			
			for($i=strlen($strSeq)-1; $i>0; $i--) {
				$strAa = $strSeq[$i];
				$dblCurrentMass += $this->_processAminoAcid($strAa, $dblCurrentMass, $ion, strlen($strSeq)-$i, $i);
			}
		}
		
		return $this->_tempArray;
	}
}

/* End of file IonCalculator.php */
/* Location: ./xprot/phprot/peptide/IonCalculator.php */ 