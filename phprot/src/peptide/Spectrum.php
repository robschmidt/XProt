<?php
/**
 * Spectrum.php
 * 
 * This file contains the Spectrum class which when implemented represents a peptide spectrum
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.2
 * @package mpimp.jsprot
 * @subpackage peptide
*/


/**
 * The Spectrum class when implemented represents a peptide spectrum
 * 
 *  Example:
 *  <code>
 *  //Prepare example data
 *  $spectrum = '273.20615:50.3 281.18347:183.0 297.75990:173.3 318.60642:196.6';
 *  $annotations = array(
 *  	array('mass' => 273.2, 'intensity' => 50.3, annotation => 'first annotation'),
 * 		array('mass' => 281.0, 'intensity' => 183.0, annotation => 'second annotation')
 *  );
 *  
 *  $pep = new Peptide(array(
 *  	'sequence' => 'KDEPAEEDGDLGFGLFD'
 *  ));
 *  
 *  $spec = new Spectrum(array(
 *  	'peptide' => $pep
 *  ));
 *	$valid = $spec->setSpectrumByString($spectrum);
 *	if ($valid === true) {
 *		//Map the annotations to the spectrum by mass
 *		$annotSpec = $spec->annotateSpectrum($annotations, 'mass', 'intensity', 'annotation', 300, 'ppm');
 *	}
 *  </code>
 *  
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.1
 * @package mpimp.phprot
 * @subpackage peptide
 */
class Spectrum
{
	/**
	 * @var The spectrum as an array of assoc arrays containg the keys mass and intensity
	 */
	public $spectrum = array();
	
	/**
	 * @var A peptide object the spectrum belongs to
	 */
	public $peptide = null;
	
	
	//###################################################################
	/**
	 * The class constructor
	 * @param object $config[optional] The configuration object
	 * @cfg spectrum The spectrum as an array of assoc arrays containg the keys mass and intensity
	 * @cfg peptide A peptide object the spectrum belongs to
	 */
	public function __construct($config = null)
	{
		if (!isset($config)) {
			$config = array();
		}
		
		//-- Apply config values to this --
		$this->spectrum = array_key_exists('spectrum', $config) ? $config['spectrum'] : $this->spectrum;
		$this->peptide = array_key_exists('peptide', $config) ? $config['peptide'] : $this->peptide;
	}
	
	//###################################################################
	/**
	 * Annotates the specified spectrum on mass base. This function compares masses from the specified spectrum with the annotation array masses.
	 * On match, the sequence will be annotated with the annoations from annotation array.
	 * @param array annotations An array of objects containing properties for mass, intensity and annotation
	 * @param string massprop The array key where the mass can be found
	 * @param string intensityprop The array key where the intensity can be found
	 * @param string annotationprop The array key where the annotation can be found
	 * @param float threshold The mass threshold to use when comparing with the spectrum
	 * @param string thresholdtype The mass treshold type ('percent', 'ppm' or 'da')
	 * @return Returns an array of objects similar to the objects of the provided annotations array with the same properties. The return array contains ALL
	 * mass/intensity pairs from the original spectrum but the matching pairs are annotated.
	 */
	public function annotateSpectrum($annotations, $massprop, $intensityprop, $annotationprop, $threshold, $thresholdtype)
	{
		$arrReturn = array();
		$dblFactor = 0;
		$dblInt = 0;
		$dblMass = 0;
		$dblMassMax = 0;
		$dblMassMin = 0;
		$k = 0;
		$l = count($annotations);
		$varEntry = null;
		
		if ($thresholdtype === 'da') {
			$dblFactor = $threshold;
		}
		
		for ($i=0,$j= count($this->spectrum); $i<$j; $i++) {
			$dblMass = $this->spectrum[$i]['mass'];
			$dblInt = $this->spectrum[$i]['intensity'];
			
			if ($thresholdtype === 'ppm') {
				$dblFactor = 0.000001 * $threshold * $dblMass;
			}
			if ($thresholdtype === 'percent') {
				$dblFactor = 0.01 * $threshold * $dblMass;
			}
			
			$dblMassMin = $dblMass - $dblFactor;
			$dblMassMax = $dblMass + $dblFactor;
	
			$strAnnot = '';
			for ($k=0; $k<$l; $k++) {
				$varEntry = $annotations[$k];
				
				if ($varEntry[$massprop] >= $dblMassMin && $varEntry[$massprop] <= $dblMassMax) {
					$strAnnot .= $varEntry[$annotationprop].' ';
				}
			}
			
			if ($strAnnot !== '') {
				$strAnnot = substr($strAnnot, 0, strlen($strAnnot)-1);
			}
			
			unset($varTemp);
			$varTemp[$massprop] = $dblMass;
			$varTemp[$intensityprop] = $dblInt;
			$varTemp[$annotationprop] = $strAnnot;
			$arrReturn[] = $varTemp;
		}
		
		return $arrReturn;
	}
	
	/**
	 * Evaluates the spectrum based on the annotation array. The more annotations fit to the spectrum, the higher the score
	 *
	 */
	public function getSpectrumScore($annotations, $massprop, $intensityprop, $annotationprop, $threshold, $thresholdtype)
	{
		$arrReturn = array();
		$dblFactor = 0;
		$dblInt = 0;
		$dblMass = 0;
		$dblMassMax = 0;
		$dblMassMin = 0;
		$k = 0;
		$l = count($annotations);
		$varEntry = null;
		$aFound = 0;
		
		if ($thresholdtype === 'da') {
			$dblFactor = $threshold;
		}
		
		for ($i=0,$j= count($this->spectrum); $i<$j; $i++) {
			$dblMass = $this->spectrum[$i]['mass'];
			$dblInt = $this->spectrum[$i]['intensity'];
			
			if ($thresholdtype === 'ppm') {
				$dblFactor = 0.000001 * $threshold * $dblMass;
			}
			if ($thresholdtype === 'percent') {
				$dblFactor = 0.01 * $threshold * $dblMass;
			}
			
			$dblMassMin = $dblMass - $dblFactor;
			$dblMassMax = $dblMass + $dblFactor;
	
			$strAnnot = '';
			for ($k=0; $k<$l; $k++) {
				$varEntry = $annotations[$k];
				
				if ($varEntry[$massprop] >= $dblMassMin && $varEntry[$massprop] <= $dblMassMax) {
					$aFound++;
				}
			}
		}
		
		if ($aFound === 0) {
			return 0;
		}
		
		return $aFound / count($annotations); 
	}
	
	//###################################################################
	/**
	 * Reads a spectrum from a string
	 * @param string $spectrum The string to read the spectrum from
	 * @param string $valueseparator[optional] The string separating the mass and intensity value. Default is ":"
	 * @param string $entryseparator[optional] The string separating the spectrum entries. Default is " "
	 * @return bool True if successfully read, fals else
	 */
	public function setSpectrumByString($spectrum, $valueseparator=':', $entryseparator=' ')
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
		$arrReturn = array();
		
		if (!isset($spectrum) || $spectrum === '') {
			$this->toLog('error', $loc, 'Spectrum not valid', 'The specified spectrum is not a valid string.', '');
			return false;
		}
		
		$arrEntries = explode($entryseparator, $spectrum);
		foreach ($arrEntries as $entry) {
			if ($entry === '') {
				continue;
			}
			
			if (strpos($entry, $valueseparator) === false) {
				$this->toLog('error', $loc, 'Invalid spectrum entry', 'An invalid spectrum entry was found during parse.', '');
				return false;
			}
			
			$arrEntry = explode($valueseparator, trim($entry));
			if (count($arrEntry) !== 2) {
				$this->toLog('error', $loc, 'Invalid number of values', 'A spectrum entry with more or less values than 2 detected. Spectrum entries must contain only two values (mass and intensity).', '');
				return false;
			}
			$mass = is_numeric($arrEntry[0]) ? floatval($arrEntry[0]) : -1;
			$int = is_numeric($arrEntry[1]) ? floatval($arrEntry[1]) : -1;
			
			if ($mass === -1 || $int === -1) {
				$this->toLog('error', $loc, 'Non-numeric value', 'A non-numeric value (mass or intensity) has been detected while parseing.', '');
				return false;
			}
			
			$arrReturn[] = array('mass' => $mass, 'intensity' => $int);
		}
		
		$this->spectrum = $arrReturn;
		return true;
	}
} 


/* End of file Spectrum.php */
/* Location: ./xprot/phprot/peptide/Spectrum.php */ 