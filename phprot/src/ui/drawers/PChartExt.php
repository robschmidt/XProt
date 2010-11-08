<?php

class PChartExt extends pChart
{
	
	
	/* This function draws a peak chart */
	public function drawPeaks($Data,$DataDescription)
    {
     /* Validate the Data and DataDescription array */
     $this->validateDataDescription("drawBarGraph",$DataDescription);
     $this->validateData("drawBarGraph",$Data);

     $GraphID      = 0;
     $Series       = count($DataDescription["Values"]);
     $SeriesWidth  = $this->DivisionWidth / ($Series+1);
     $SerieXOffset = $this->DivisionWidth / 2 - $SeriesWidth / 2;

     $YZero  = $this->GArea_Y2 - ((0-$this->VMin) * $this->DivisionRatio);
     if ( $YZero > $this->GArea_Y2 ) { $YZero = $this->GArea_Y2; }

     $SerieID = 0;
     foreach ( $DataDescription["Values"] as $Key2 => $ColName )
      {
       $ID = 0;
       foreach ( $DataDescription["Description"] as $keyI => $ValueI )
        { if ( $keyI == $ColName ) { $ColorID = $ID; }; $ID++; }

       $XPos  = $this->GArea_X1 + $this->GAreaXOffset - $SerieXOffset + $SeriesWidth * $SerieID;
       $XLast = -1;
       foreach ( $Data as $Key => $Values )
        {
         if ( isset($Data[$Key][$ColName]))
          {
           if ( is_numeric($Data[$Key][$ColName]) )
            {
             $Value = $Data[$Key][$ColName];
             $YPos = $this->GArea_Y2 - (($Value-$this->VMin) * $this->DivisionRatio);

             /* Save point into the image map if option activated */
             if ( $this->BuildMap )
              {
               //$this->addToImageMap($XPos+1,min($YZero,$YPos),$XPos+$SeriesWidth-1,max($YZero,$YPos),$DataDescription["Description"][$ColName],$Data[$Key][$ColName].$DataDescription["Unit"]["Y"],"Bar");
              }
           	
           	$this->drawLine($XPos+1,$YZero,$XPos+1,$YPos,25,25,25,true);
            }
          }
         $XPos = $XPos + $this->DivisionWidth;
        }
       $SerieID++;
      }
    }
      
    /* This function places an anotation on a spetrum graph */
   function setAnnotation($Data,$DataDescription,$SerieName,$ValueName,$Caption,$R=210,$G=210,$B=210)
    {
     /* Validate the Data and DataDescription array */
     $this->validateDataDescription("setLabel",$DataDescription);
     $this->validateData("setLabel",$Data);
     $ShadowFactor = 100;
     $C_Label      =$this->AllocateColor($this->Picture,$R,$G,$B);
     $C_Shadow     =$this->AllocateColor($this->Picture,$R-$ShadowFactor,$G-$ShadowFactor,$B-$ShadowFactor);
     $C_TextColor  =$this->AllocateColor($this->Picture,0,0,0);

     $Cp = 0; $Found = FALSE;
     foreach ( $Data as $Key => $Value )
      {
       if ( $Data[$Key][$DataDescription["Position"]] == $ValueName )
        { $NumericalValue = $Data[$Key][$SerieName]; $Found = TRUE; }
       if ( !$Found )
        $Cp++;
      }

     $XPos = $this->GArea_X1 + $this->GAreaXOffset + ( $this->DivisionWidth * $Cp ) + 2;
     $YPos = $this->GArea_Y2 - ($NumericalValue - $this->VMin) * $this->DivisionRatio;

     $Position   = imageftbbox($this->FontSize,0,$this->FontName,$Caption);
     $TextHeight = $Position[3] - $Position[5];
     $TextWidth  = $Position[2]-$Position[0] + 2;
     $TextOffset = floor($TextHeight/2);

     // Shadow
     /*
     $Poly = array($XPos+1,$YPos+1,$XPos + 9,$YPos - $TextOffset,$XPos + 8,$YPos + $TextOffset + 2);
     imagefilledpolygon($this->Picture,$Poly,3,$C_Shadow);
     $this->drawLine($XPos,$YPos+1,$XPos + 9,$YPos - $TextOffset - .2,$R-$ShadowFactor,$G-$ShadowFactor,$B-$ShadowFactor);
     $this->drawLine($XPos,$YPos+1,$XPos + 9,$YPos + $TextOffset + 2.2,$R-$ShadowFactor,$G-$ShadowFactor,$B-$ShadowFactor);
     $this->drawFilledRectangle($XPos + 9,$YPos - $TextOffset-.2,$XPos + 13 + $TextWidth,$YPos + $TextOffset + 2.2,$R-$ShadowFactor,$G-$ShadowFactor,$B-$ShadowFactor);

     // Label background
     $Poly = array($XPos,$YPos,$XPos + 8,$YPos - $TextOffset - 1,$XPos + 8,$YPos + $TextOffset + 1);
     imagefilledpolygon($this->Picture,$Poly,3,$C_Label);
     $this->drawLine($XPos-1,$YPos,$XPos + 8,$YPos - $TextOffset - 1.2,$R,$G,$B);
     $this->drawLine($XPos-1,$YPos,$XPos + 8,$YPos + $TextOffset + 1.2,$R,$G,$B);
     $this->drawFilledRectangle($XPos + 8,$YPos - $TextOffset - 1.2,$XPos + 12 + $TextWidth,$YPos + $TextOffset + 1.2,$R,$G,$B);
	*/
     $this->drawLine($XPos-2,$YPos,$XPos-2,$YPos -50,200,200,200);
     
     imagettftext($this->Picture,$this->FontSize,90,$XPos,$YPos -50,$C_TextColor,$this->FontName,$Caption);
    }
	
}