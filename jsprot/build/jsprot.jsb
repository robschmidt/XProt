<?xml version="1.0" encoding="utf-8"?>
<project path="" name="jsprot" author="Robert Schmidt" version="0.9" copyright="$projectName $version&#xD;&#xA;Copyright(c) 2006, $author.&#xD;&#xA;&#xD;&#xA;This code is licensed under MITlicense. Use it as you wish, &#xD;&#xA;but keep this copyright intact." output="D:\development\workspace\XProt\jsprot\build" source="False" source-dir="$output\source" minify="False" min-dir="$output" doc="False" doc-dir="$output\docs" master="true" master-file="$output\yui-ext.js" zip="true" zip-file="$output\yuo-ext.$version.zip">
  <directory name="..\jsprot" />
  <file name="..\jsprot\constants.js" path="" />
  <file name="..\jsprot\ModifiedPeptide.js" path="" />
  <file name="..\jsprot\Peptide.js" path="" />
  <target name="jsprot" file="$output\jsprot_$version.js" debug="True" shorthand="False" shorthand-list="YAHOO.util.Dom.setStyle&#xD;&#xA;YAHOO.util.Dom.getStyle&#xD;&#xA;YAHOO.util.Dom.getRegion&#xD;&#xA;YAHOO.util.Dom.getViewportHeight&#xD;&#xA;YAHOO.util.Dom.getViewportWidth&#xD;&#xA;YAHOO.util.Dom.get&#xD;&#xA;YAHOO.util.Dom.getXY&#xD;&#xA;YAHOO.util.Dom.setXY&#xD;&#xA;YAHOO.util.CustomEvent&#xD;&#xA;YAHOO.util.Event.addListener&#xD;&#xA;YAHOO.util.Event.getEvent&#xD;&#xA;YAHOO.util.Event.getTarget&#xD;&#xA;YAHOO.util.Event.preventDefault&#xD;&#xA;YAHOO.util.Event.stopEvent&#xD;&#xA;YAHOO.util.Event.stopPropagation&#xD;&#xA;YAHOO.util.Event.stopEvent&#xD;&#xA;YAHOO.util.Anim&#xD;&#xA;YAHOO.util.Motion&#xD;&#xA;YAHOO.util.Connect.asyncRequest&#xD;&#xA;YAHOO.util.Connect.setForm&#xD;&#xA;YAHOO.util.Dom&#xD;&#xA;YAHOO.util.Event">
    <include name="..\src\constants.js" />
    <include name="..\src\XProtBase.js" />
    <include name="..\src\Peptide.js" />
    <include name="..\src\ModifiedPeptide.js" />
    <include name="..\src\peptide\IonCalculator.js" />
    <include name="..\src\peptide\Spectrum.js" />
    <include name="..\src\ui\Spectrum.js" />
    <include name="..\src\ui\drawers\GoogleVisDrawer.js" />
  </target>
  <file name="..\jsprot\peptide\IonCalculator.js" path="peptide" />
  <file name="..\jsprot\peptide\Spectrum.js" path="peptide" />
  <file name="..\jsprot\ui\spectrum\GoogleVisDrawer.js" path="ui\spectrum" />
  <file name="..\jsprot\ui\Spectrum.js" path="ui" />
  <file name="..\jsprot\XProtBase.js" path="" />
  <file name="..\jsprot\util\PeptideVariants.js" path="util" />
  <directory name=".." />
  <file name="..\constants.js" path="" />
  <file name="..\Peptide.js" path="" />
  <file name="..\ModifiedPeptide.js" path="" />
  <file name="..\XProtBase.js" path="" />
  <file name="..\ui\spectrum\GoogleVisDrawer.js" path="ui\spectrum" />
  <file name="..\ui\Spectrum.js" path="ui" />
  <file name="..\peptide\IonCalculator.js" path="peptide" />
  <file name="..\peptide\Spectrum.js" path="peptide" />
  <file name="..\src\peptide\IonCalculator.js" path="src\peptide" />
  <file name="..\src\peptide\Spectrum.js" path="src\peptide" />
  <file name="..\src\ui\drawers\GoogleVisDrawer.js" path="src\ui\drawers" />
  <file name="..\src\ui\Spectrum.js" path="src\ui" />
  <file name="..\src\constants.js" path="src" />
  <file name="..\src\ModifiedPeptide.js" path="src" />
  <file name="..\src\Peptide.js" path="src" />
  <file name="..\src\XProtBase.js" path="src" />
</project>