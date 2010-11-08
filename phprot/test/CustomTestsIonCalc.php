<?php
/**
 * CustomTestsIonCalc.php
 * 
 * Custom tests for the IonCalculator class
 * @author Robert Schmidt <robert@wildpack.de>
 * @version 0.1
 * @package mpimp.phprot
 * @subpackage 
 */

include_once('../PhProt.php');

$pp = new PhProt();
$pp->using('base');
$pp->using('peptide');

$pep = new ModifiedPeptide();
$pep->Sequence = 'KDEPAEESDGDLGFGLFD';
$pep->NTerminus = 'H';
$pep->CTerminus = 'OH';
$pep->addModification(array(
	'accession' => 21,
	'position' => 7
));

$strIon = 'b';
$ic = new IonCalculator(array(
	'peptide' => $pep,
	'maxcharge' => 3,
	'weighttype' => 'monoisotopic',
	'neutralloss' => array('H2O', 'NH3'),
	'customtemplate' => '{ion}{index}{charge} {flag}'
));

print('<h3>Testing</h3>');
print('Peptide: '.$pep->Sequence.'<br />');

print('<h3>Result for '.$strIon.'-Ions</h3>');
print('<table style="border: null">');
$arrResult = $ic->calculateIon($strIon);
for ($i=0; $i<count($arrResult); $i++) {
	print('<tr><td>'.strval($arrResult[$i]['mass']).'</td><td>'.$arrResult[$i]['ion'].strval($arrResult[$i]['index']).
		'</td><td>'.strval($arrResult[$i]['charge']).'</td><td>'.$arrResult[$i]['flag'].'</td><td>'.$arrResult[$i]['custom'].'</td></tr>');
}
print('</table>');


print('<h3>Testing</h3>');
print('Peptide: '.$pep->Sequence.'<br />');
$strIon = 'y';
print('<h3>Result for '.$strIon.'-Ions</h3>');
print('<table style="border: null">');
$arrResult = $ic->calculateIon($strIon);
for ($i=0; $i<count($arrResult); $i++) {
	print('<tr><td>'.strval($arrResult[$i]['mass']).'</td><td>'.$arrResult[$i]['ion'].strval($arrResult[$i]['index']).
		'</td><td>'.strval($arrResult[$i]['charge']).'</td><td>'.$arrResult[$i]['flag'].'</td><td>'.$arrResult[$i]['custom'].'</td></tr>');
}
print('</table>');

/* End of file CustomTestsIonCalc.php */
/* Location: ./xprot/phprot/test/CustomTestsIonCalc.php */ 