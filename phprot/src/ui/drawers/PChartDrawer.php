<?php
/**
 * PChartDrawer.php
 * 
 * This file contains a drawer for the SpectrumUi class using the pChart package
 * Further information: http://pchart.sourceforge.net/
 * @author Robert Schmidt <robert@wildpack.de>
 * @version 0.1
 * @package mpimp.phprot
 * @subpackage ui.drawers
 */

require_once(dirname(__FILE__).'/pchart/pData.class');
require_once(dirname(__FILE__).'/pchart/pChart.class');

/**
 * A drawer for the SpectrumUi class using the pChart package.  See SpectrumUi for an example of how to use a drawer together with the SpectrumUi class
 * Further information of pChart: http://pchart.sourceforge.net/
 * @author Robert Schmidt <robert@wildpack.de>
 * @version 0.1
 * @package mpimp.phprot
 * @subpackage ui.drawers
 */
class PChartDrawer
{
	/**
	 * @var The width of the spectrum image
	 */
	public $width = 800;
	
	/**
	 * @var The height of the spectrum image
	 */
	public $height = 600;
	
	/**
	 * @var The title color as array(R,G,B)
	 */
	public $colortitle = array(50,50,50);
	
	/**
	 * @var The color of the scale as array(R,G,B)
	 */
	public $colorscale = array(50,50,50);
	
	/**
	 * @var The color of the graph/spectrum as array(R,G,B)
	 */
	public $colorgraph = array(50,50,50);
	
	/**
	 * @var The color of the background as array(R,G,B)
	 */
	public $colorbg = array(254,254,254);
	
	/**
	 * @var The title to display on top of the spectrum
	 */
	public $title = 'Spectrum';
	
	//###################################################################
	/**
	 * The class constructor
	 * @param object $config[optional] The configuration object
	 * @cfg width The width of the spectrum image
	 * @cfg height The height of the spectrum image
	 * @cfg colortitle The title color as array(R,G,B)
	 * @cfg colorscale The color of the scale as array(R,G,B)
	 * @cfg colorgraph The color of the graph/spectrum as array(R,G,B)
	 * @cfg title The title to display on top of the spectrum
	 * @cfg tofile A filename to write the the spectrum to. Leave empty to print the image directly to UI 
	 */
	public function __construct($config = null)
	{
		if (!isset($config) || is_null($config) || !is_array($config)) {
			$config = array();
		}
		
		$this->width = array_key_exists('width', $config) ? $config['width'] : $this->width;
		$this->height = array_key_exists('height', $config) ? $config['height'] : $this->height;
		$this->colortitle = array_key_exists('colortitle', $config) ? $config['colortitle'] : $this->colortitle;
		$this->colorscale = array_key_exists('colorscale', $config) ? $config['colorscale'] : $this->colorscale;
		$this->colorgraph = array_key_exists('colorgraph', $config) ? $config['colorgraph'] : $this->colorgraph;
		$this->title = array_key_exists('title', $config) ? $config['title'] : $this->title;
		$this->colorbg = array_key_exists('colorbg', $config) ? $config['colorbg'] : $this->colorbg;
	}
	
	//###################################################################
	/**
	 * Initialize the drawer. This method will be called by the SpectrumUi class object
	 * @param object $spectrumUi A SpectrumUi class instance which is using this drawer
	 */
	public function init($spectrumUi)
	{
		$this->spectrumUi = $spectrumUi;
	}
	
	//###################################################################
	/**
	 * The function to draw the spectrum
	 */	
	public function draw()
	{
		$arrSpec = $this->spectrumUi->spectrum;
		$data = new pData;     
		
		//-- Provide data --
		$arrLabels = array();
		foreach($arrSpec as $entry) {
			$strAnnot = $entry[$this->spectrumUi->annotationproperty];
			$dblInt = $entry[$this->spectrumUi->intensityproperty];
			$dblMass = $entry[$this->spectrumUi->massproperty];
			
			if (!is_null($strAnnot) && $strAnnot !== '') {
				$arrLabels[] = array($dblMass, $strAnnot);
			}
			
			$data->AddPoint($dblInt);
			$data->AddPoint($dblMass, 'Serie2');
		}
		
		$data->AddSerie('Serie1');  
		$data->SetAbsciseLabelSerie('Serie2'); 
		$data->SetSerieName('Intensities','Serie1'); 
		$data->SetSerieName('Masses','Serie2'); 
		
		$chart = new PChartExt($this->width, $this->height);
		$chart->setColorPalette(0,$this->colorgraph[0],$this->colorgraph[1],$this->colorgraph[2]);  
		$chart->setFontProperties(dirname(__FILE__).'/pchart/tahoma.ttf',8);  
		$chart->setGraphArea(50,60,$this->width-50,$this->height-30);
		$chart->setLineStyle(1);
		$chart->drawBackground($this->colorbg[0], $this->colorbg[1], $this->colorbg[2]);
		$chart->drawScale($data->GetData(),$data->GetDataDescription(),SCALE_NORMAL,$this->colorscale[0],$this->colorscale[1],
			$this->colorscale[2],true,0,0,false,count($arrSpec)/10);
		$chart->drawPeaks($data->GetData(),$data->GetDataDescription());
		$chart->drawTitle(50,22,$this->title,$this->colortitle[0],$this->colortitle[1],$this->colortitle[2],585); 
		
		//-- Draw labels --
		foreach ($arrLabels as $label) {
			$chart->setAnnotation($data->GetData(),$data->GetDataDescription(),'Serie1',$label[0],$label[1],255,255,255);  
		}
		
		//-- Render spectrum --
		$toFile = $this->spectrumUi->tofile;
		if (!is_null($toFile) && $toFile !== '') {
			$chart->Render($toFile); //To file
		} else {
			$chart->Stroke(); //Directly to ui
		}
	}
}

/* End of file PChartDrawer.php */
/* Location: ./xprot/phprot/ui/drawers/PChartDrawer.php */ 