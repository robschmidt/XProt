<?php
/**
 * SpectrumUi.php
 * 
 * This file contains the SpectrumUi class which is used to draw a spectrum
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.1
 * @package mpimp.phprot
 * @subpackage ui
 */

/**
 * The SpectrumUi class which is used to draw a spectrum
 * 
 * Example:
 * <code>
 * $specUi = new SpectrumUi(array(
 * 		'drawer' => new PChartDrawer(array(
 * 			'width' => 900,
 * 			'height' => 400
 * 		)),
 * 		'tofile' => dirname(__FILE__).'/spectrum.png', //leave blank to send spectrum directly to browser
 * 		'spectrum' => $annotSpec, //An array containing assoc arrays with mass, intensity and annotation values
 * 		'annotationproperty' => 'custom' //The key which used in spectrum array to store the annotation
 * 	));
 * 	$specUi->draw();
 * </code>
 * 
 * @author Robert Schmidt <schmidt1@mpimp-golm.mpg.de>
 * @version 0.1
 * @package mpimp.phprot
 * @subpackage ui
 */
class SpectrumUi extends XProtBase
{
	/**
	 * @var The drawer object to use drawing the spectrum. The drawer object must have the two methods init and draw. The init method will 
	 * be called with one parameter which is the spectrum object. The draw methods will be called without parameters. All necessary data can 
	 * be retrieved from the spectrum object delivered when calling the init method.
	 */
	public $drawer = null;
	
	/**
	 * @var The spectrum as array of objects containing properties for mass, intensity and annotation
	 */
	public $spectrum = array();
	
	/**
	 * @var The array key of an spectrum entry which stores the mass value
	 */
	public $massproperty = 'mass';
	
	/**
	 * @var The array key of an spectrum entry which stores the intensity value
	 */
	public $intensityproperty = 'intensity';
	
	/**
	 * @var The array key of an spectrum entry which stores the annotation value
	 */
	public $annotationproperty = 'annotation';
	
	/**
	 * @var A filename to write the the spectrum to. Leave blank to print the image directly to UI (browser)
	 */
	public $tofile = '';
	
	
	//###################################################################
	/**
	 * The class constructor
	 * @param object $config[optional] The configuration object
	 * @cfg draweer The drawer object used to draw the graph
	 * @cfg spectrum The spectrum as array of objects containing properties for mass, intensity and annotation
	 * @cfg massproperty The array key of an spectrum entry which stores the mass value
	 * @cfg intensityproperty The array key of an spectrum entry which stores the intensity value
	 * @cfg annotationproperty The array key of an spectrum entry which stores the annotation value
	 */
	public function  __construct($config = null)
	{
		if (!isset($config) || is_null($config) || !is_array($config)) {
			$config = array();
		}
	
		$this->drawer = array_key_exists('drawer', $config) ? $config['drawer'] : $this->drawer;
		$this->spectrum = array_key_exists('spectrum', $config) ? $config['spectrum'] : $this->spectrum;
		$this->massproperty = array_key_exists('massproperty', $config) ? $config['massproperty'] : $this->massproperty;
		$this->intensityproperty = array_key_exists('intensityproperty', $config) ? $config['intensityproperty'] : $this->intensityproperty;
		$this->annotationproperty = array_key_exists('annotationproperty', $config) ? $config['annotationproperty'] : $this->annotationproperty;
		$this->tofile = array_key_exists('tofile', $config) ? $config['tofile'] : $this->tofile;
		
		if (isset($this->drawer) && method_exists($this->drawer, 'init')) {
			return $this->drawer->init($this);
		}
	}
	
	
	//###################################################################
	/**
	 * The method to draw the spectrum
	 */
	public function draw()
	{
		$loc = basename(__FILE__).'/'.__METHOD__;
		
		if (isset($this->drawer) && method_exists($this->drawer, 'draw')) {
			return $this->drawer->draw();
		} else {
			$this->toLog('error', $loc, 'Invalid drawer object', 'The provided drawer is not valid (missing draw function?!).', '');
		}
	}
}

/* End of file SpectrumUi.php */
/* Location: ./xprot/phprot/SpectrumUi.php */ 