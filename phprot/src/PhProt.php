<?php
/**
 * PhProt.php
 * 
 * This file contains the helper functions for the whole PhProt package
 * @author Robert Schmidt <rob.smith@gmx.de>
 * @version 0.1.0
 * @package mpimp.phprot
 * 
 * 
*/
if (function_exists("wpEmbed") !== true) {
	/**
	 * A wrapper function for require_once to be called from classes but provide global includings
	 * @param $embedPath String The path to embed
	 */
	function wpEmbed($embedPath)
	{
		require_once($embedPath);
	}
}

/**
 * The main package class providing package related functionality
 * 
 * Example of usage:
 * <code>
 * $pp = new PhProt();
 * $pp->using('base'); //The function does all the necessary require statements to use the base package of PhProt
 * $pp->using('ui'); //The function does all the necessary require statements to use the ui package of PhProt
 * </code>
 * 
 * @author Robert Schmidt <rob.smith@gmx.de>
 * @version 0.1.0
 * @package mpimp.phprot
 */
class PhProt
{
	public $Version = '0.1.0';
	public $Build = '20100906112800';
	
	//####################################################################
	/**
	 * An array containing all possible packages and files in inclusion order
	 */
	protected $Components = array(
		'*' => array(
			'base',
			'peptide',
			'drawers',
			'ui'
		),
		'base' => array(
			'constants.php',
			'XProtBase.php',
			'Peptide.php',
			'ModifiedPeptide.php'
		),
		'peptide' => array(
			'base',
			'peptide/IonCalculator.php',
			'peptide/Spectrum.php'
		),
		'drawers' => array(
			'ui/drawers/PChartDrawer.php',
			'ui/drawers/PChartExt.php'
		),
		'ui' => array(
			'base',
			'peptide',
			'drawers',
			'ui/SpectrumUi.php'
		)
	);
	
	//####################################################################
	/**
	 * An array containing all already included packages and files
	 */
	protected $IncludedComponents = array();
	
	//####################################################################
	/**
	 * Recursively embeds packages and files using the global wpEmbed function
	 * @param $strPart String The package or file to embed 
	 */
	protected function embedComponent($strPart)
	{
		if (!array_key_exists($strPart, $this->Components)) {
			return false;
		}
		if (in_array($strPart, $this->IncludedComponents)) {
			return;
		}
		$this->IncludedComponents[] = $strPart;
		
		$arrTemp = $this->Components[$strPart];
		foreach ($arrTemp as $strEntry) {
			if (substr($strEntry, strlen($strEntry)-4) === '.php') {
				
				wpEmbed(dirname(__FILE__).'/'.$strEntry);
			} else {
				$this->embedComponent($strEntry);
			}
		}
	}
	
	//####################################################################
	/**
	 * Embeds the specified package or file - basically this is a wrapper for require_once
	 * @param $packageOrFile String The package or file to embed
	 */
	public function using($packageOrFile)
	{
		print('using');
		$this->embedComponent($packageOrFile);
	}
}
/* End of file PhProt.php */
/* Location: ./xprot/phprot/PhProt.php */ 
