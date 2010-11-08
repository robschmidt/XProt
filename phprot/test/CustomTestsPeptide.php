<?php
/**
 * CustomTestsPeptide.php
 * 
 * Customized tests for PhProt peptide and modified peptide
 * @author Robert Schmidt <robert@wildpack.de>
 * @version 0.1
 * @package mpimp.phprot
 */

include_once('../PhProt.php');

$pp = new PhProt();
$pp->using('base');
$pp->using('peptide');
$pep = new Peptide();

// ###### VALIDATION ######
print('<h1>Testing validation</h1>');

$seq = 'HGYIGEFEYVDDHR';
print('Peptide: '.$seq.'<br />');
if ($pep->validateSequence($seq) === true) {
	print('TRUE<br />');
} else {
	print('FALSE<br />');
}

$seq = 'HXGYIGEFEYVDDHR';
print('Peptide: '.$seq.'<br />');
if ($pep->validateSequence($seq) === true) {
	print('TRUE<br />');
} else {
	print('FALSE<br />');
}

$seq = 'HGYIGEF4EYVDDHR';
print('Peptide: '.$seq.'<br />');
if ($pep->validateSequence($seq) === true) {
	print('TRUE<br />');
} else {
	print('FALSE<br />');
}

$seq = 'HGYIGEFEYV*DDHR';
print('Peptide: '.$seq.'<br />');
if ($pep->validateSequence($seq) === true) {
	print('TRUE<br />');
} else {
	print('FALSE<br />');
}


// ###### NAKED PEPTIDE ######
$pep = new Peptide();
$pep->Sequence = 'HGYIGEFEYVDDHR';
$pep->NTerminus = 'H';
$pep->CTerminus = 'OH';

print('<br><h1>Testing naked peptide</h1>');
print('Peptide: '.$pep->Sequence.'<br />');
print('N-Terminus: '.$pep->NTerminus.'<br />');
print('C-Terminus: '.$pep->CTerminus.'<br />');
			
print('<h3>Masses monoisotopic</h3>');
print('Mass C-Terminus: '.strval($pep->getCTerminusMass('monoisotopic')).'<br />');
print('Mass N-Terminus: '.strval($pep->getNTerminusMass('monoisotopic')).'<br />');
print('Peptide mass: '.strval($pep->getMass('monoisotopic')).'<br />');
print('Calculated MCR 2: '.strval($pep->getTheoreticalMCR('monoisotopic', 2)).'<br />');
			
print('<h3>Masses average</h3>');
print('Mass C-Terminus: '.strval($pep->getCTerminusMass('average')).'<br />');
print('Mass N-Terminus: '.strval($pep->getNTerminusMass('average')).'<br />');
print('Peptide mass: '.strval($pep->getMass('average')).'<br />');
print('Calculated MCR 3: '.strval($pep->getTheoreticalMCR('monoisotopic', 3)).'<br />');
			
			
$modpep = new ModifiedPeptide();
$modpep->Sequence = 'ITLLEELQEKTEEDEENKPSVIEK';
$modpep->NTerminus = 'H';
$modpep->CTerminus = 'OH';
$objMod1 = array('accession' => 21, 'position' => 1);


print('<h1>Testing phosphat modification</h1>');
print('Peptide: '.$modpep->Sequence.'<br />');
print('N-Terminus: '.$modpep->NTerminus.'<br />');
print('C-Terminus: '.$modpep->CTerminus.'<br />');
print('Modification 1: '+strval($objMod1['accession']).'<br />');


print('<h3>Masses monoisotopic without Modifications</h3>');
print('Mass C-Terminus: '.strval($modpep->getCTerminusMass('monoisotopic')).'<br />');
print('Mass N-Terminus: '.strval($modpep->getNTerminusMass('monoisotopic')).'<br />');
print('Peptide mass: '.strval($modpep->getMass('monoisotopic')).'<br />');
print('Calculated MCR 2: '.strval($modpep->getTheoreticalMCR('monoisotopic', 2)).'<br />');

print('<h3>Masses average without Modifications</h3>');
print('Mass C-Terminus: '.strval($modpep->getCTerminusMass('average')).'<br />');
print('Mass N-Terminus: '.strval($modpep->getNTerminusMass('average')).'<br />');
print('Peptide mass: '.strval($modpep->getMass('average')).'<br />');
print('Calculated MCR 3: '.strval($modpep->getTheoreticalMCR('monoisotopic', 3)).'<br />');

$modpep->addModification($objMod1);
			
print('<h3>Masses monoisotopic with Phosphat - Modifications</h3>');
print('Mass C-Terminus: '.strval($modpep->getCTerminusMass('monoisotopic')).'<br />');
print('Mass N-Terminus: '.strval($modpep->getNTerminusMass('monoisotopic')).'<br />');
print('Peptide mass: '.strval($modpep->getMass('monoisotopic')).'<br />');
print('Calculated MCR 2: '.strval($modpep->getTheoreticalMCR('monoisotopic', 2)).'<br />');

print('<h3>Masses average with Phosphat - Modifications</h3>');
print('Mass C-Terminus: '.strval($modpep->getCTerminusMass('average')).'<br />');
print('Mass N-Terminus: '.strval($modpep->getNTerminusMass('average')).'<br />');
print('Peptide mass: '.strval($modpep->getMass('average')).'<br />');
print('Calculated MCR 3: '.strval($modpep->getTheoreticalMCR('monoisotopic', 3)).'<br />');

$modpep = new ModifiedPeptide();
$modpep->Sequence = 'ITLLEELQ';
$modpep->NTerminus = 'H';
$modpep->CTerminus = 'OH';

print('<h1>Testing 15N Modification</h1>');
print('Peptide: '.$modpep->Sequence.'<br />');
print('N-Terminus: '.$modpep->NTerminus.'<br />');
print('C-Terminus: '.$modpep->CTerminus.'<br />');
print('Modification X: 15N<br />');

print('<h3>Masses monoisotopic without 15N - Modifications</h3>');
print('Mass C-Terminus: '.strval($modpep->getCTerminusMass('monoisotopic')).'<br />');
print('Mass N-Terminus: '.strval($modpep->getNTerminusMass('monoisotopic')).'<br />');
print('Peptide mass: '.strval($modpep->getMass('monoisotopic')).'<br />');
print('Calculated MCR 2: '.strval($modpep->getTheoreticalMCR('monoisotopic', 2)).'<br />');

print('<h3>Masses average without 15N - Modifications</h3>');
print('Mass C-Terminus: '.strval($modpep->getCTerminusMass('average')).'<br />');
print('Mass N-Terminus: '.strval($modpep->getNTerminusMass('average')).'<br />');
print('Peptide mass: '.strval($modpep->getMass('average')).'<br />');
print('Calculated MCR 3: '.strval($modpep->getTheoreticalMCR('monoisotopic', 3)).'<br />');

$modpep->add15NModifications();
			
print('<h3>Masses monoisotopic with 15N - Modifications</h3>');
print('Mass C-Terminus: '.strval($modpep->getCTerminusMass('monoisotopic')).'<br />');
print('Mass N-Terminus: '.strval($modpep->getNTerminusMass('monoisotopic')).'<br />');
print('Peptide mass: '.strval($modpep->getMass('monoisotopic')).'<br />');
print('Calculated MCR 2: '.strval($modpep->getTheoreticalMCR('monoisotopic', 2)).'<br />');

print('<h3>Masses average with 15N - Modifications</h3>');
print('Mass C-Terminus: '.strval($modpep->getCTerminusMass('average')).'<br />');
print('Mass N-Terminus: '.strval($modpep->getNTerminusMass('average')).'<br />');
print('Peptide mass: '.strval($modpep->getMass('average')).'<br />');
print('Calculated MCR 3: '.strval($modpep->getTheoreticalMCR('monoisotopic', 3)).'<br />');

$modpep = new ModifiedPeptide();
$modpep->Sequence = 'KDEPAEESDGDLGFGLFD';
$modpep->NTerminus = 'H';
$modpep->CTerminus = 'OH';
$objMod1 = array('accession' => 21, 'position' => 7);

print('<h1>Testing phosphat data</h1>');
print('Peptide: '.$modpep->Sequence.'<br />');
print('N-Terminus: '.$modpep->NTerminus.'<br />');
print('C-Terminus: '.$modpep->CTerminus.'<br />');
print('Modification 1: '.strval($objMod1['accession']).' at '.strval($objMod1['position']).'<br />');

print('<h3>Masses monoisotopic without Phospho mod</h3>');
print('Mass C-Terminus: '.strval($modpep->getCTerminusMass('monoisotopic')).'<br />');
print('Mass N-Terminus: '.strval($modpep->getNTerminusMass('monoisotopic')).'<br />');
print('Peptide mass: '.strval($modpep->getMass('monoisotopic')).'<br />');
print('Calculated MCR 2: '.strval($modpep->getTheoreticalMCR('monoisotopic', 2)).'<br />');

print('<h3>Masses average without Phospho mod</h3>');
print('Mass C-Terminus: '.strval($modpep->getCTerminusMass('average')).'<br />');
print('Mass N-Terminus: '.strval($modpep->getNTerminusMass('average')).'<br />');
print('Peptide mass: '.strval($modpep->getMass('average')).'<br />');
print('Calculated MCR 3: '.strval($modpep->getTheoreticalMCR('monoisotopic', 3)).'<br />');

$modpep->addModification($objMod1);

print('<h3>Masses monoisotopic with Phospho mod</h3>');
print('Mass C-Terminus: '.strval($modpep->getCTerminusMass('monoisotopic')).'<br />');
print('Mass N-Terminus: '.strval($modpep->getNTerminusMass('monoisotopic')).'<br />');
print('Peptide mass: '.strval($modpep->getMass('monoisotopic')).'<br />');
print('Calculated MCR 2: '.strval($modpep->getTheoreticalMCR('monoisotopic', 2)).'<br />');

print('<h3>Masses average with Phospho mod</h3>');
print('Mass C-Terminus: '.strval($modpep->getCTerminusMass('average')).'<br />');
print('Mass N-Terminus: '.strval($modpep->getNTerminusMass('average')).'<br />');
print('Peptide mass: '.strval($modpep->getMass('average')).'<br />');
print('Calculated MCR 3: '.strval($modpep->getTheoreticalMCR('monoisotopic', 3)).'<br />');

$modpep = new ModifiedPeptide();
$modpep->setModifiedSequence('KDEPAEE(pS)DGDLGFGLFD');
$modpep->NTerminus = 'H';
$modpep->CTerminus = 'OH';

print('<h1>Testing phosphat data (using the modseq detector)</h1>');
print('<h3>Masses monoisotopic with Phospho mod</h3>');
print('Mass C-Terminus: '.strval($modpep->getCTerminusMass('monoisotopic')).'<br />');
print('Mass N-Terminus: '.strval($modpep->getNTerminusMass('monoisotopic')).'<br />');
print('Peptide mass: '.strval($modpep->getMass('monoisotopic')).'<br />');
print('Calculated MCR 2: '.strval($modpep->getTheoreticalMCR('monoisotopic', 2)).'<br />');

print('<h3>Masses average with Phospho mod</h3>');
print('Mass C-Terminus: '.strval($modpep->getCTerminusMass('average')).'<br />');
print('Mass N-Terminus: '.strval($modpep->getNTerminusMass('average')).'<br />');
print('Peptide mass: '.strval($modpep->getMass('average')).'<br />');
print('Calculated MCR 3: '.strval($modpep->getTheoreticalMCR('monoisotopic', 3)).'<br />');

print('<h1>Other tests</h1>');

$pep = new Peptide();
$pep->Sequence ='LSNSGDAKVR';
$pep->NTerminus = 'H';
$pep->CTerminus = 'OH';

print('<h3>Test for '.$pep->Sequence.'</h3>');
print('Mass C-Terminus: '.strval($modpep->getCTerminusMass('monoisotopic')).'<br />');
print('Mass N-Terminus: '.strval($modpep->getNTerminusMass('monoisotopic')).'<br />');
print('Peptide mass: '.strval($modpep->getMass('monoisotopic')).'<br />');
print('Calculated MCR 2: '.strval($modpep->getTheoreticalMCR('monoisotopic', 2)).'<br />');

$modpep = new ModifiedPeptide();
$modpep->setModifiedSequence('LSN(pS)GDAKVR');
$modpep->NTerminus = 'H';
$modpep->CTerminus = 'OH';

print('<h3>Test for '.$modpep->Sequence.' with Phosphosite</h3>');
print('Mass C-Terminus: '.strval($modpep->getCTerminusMass('monoisotopic')).'<br />');
print('Mass N-Terminus: '.strval($modpep->getNTerminusMass('monoisotopic')).'<br />');
print('Peptide mass: '.strval($modpep->getMass('monoisotopic')).'<br />');
print('Calculated MCR 2: '.strval($modpep->getTheoreticalMCR('monoisotopic', 2)).'<br />');

$modpep = new ModifiedPeptide();
$modpep->setModifiedSequence('(pS)YTNLLDLASGNFPVMGR');
$modpep->NTerminus = 'H';
$modpep->CTerminus = 'OH';

print('<h3>Test for '.$modpep->Sequence.' with Phosphosite</h3>');
print('Mass C-Terminus: '.strval($modpep->getCTerminusMass('monoisotopic')).'<br />');
print('Mass N-Terminus: '.strval($modpep->getNTerminusMass('monoisotopic')).'<br />');
print('Peptide mass: '.strval($modpep->getMass('monoisotopic')).'<br />');
print('Calculated MCR 2: '.strval($modpep->getTheoreticalMCR('monoisotopic', 2)).'<br />');

$modpep = new ModifiedPeptide();
$modpep->setModifiedSequence('VNIKAPGD(pS)PNTDGIK');
$modpep->NTerminus = 'H';
$modpep->CTerminus = 'OH';

print('<h3>Test for '.$modpep->Sequence.' with Phosphosite</h3>');
print('Mass C-Terminus: '.strval($modpep->getCTerminusMass('monoisotopic')).'<br />');
print('Mass N-Terminus: '.strval($modpep->getNTerminusMass('monoisotopic')).'<br />');
print('Peptide mass: '.strval($modpep->getMass('monoisotopic')).'<br />');
print('Calculated MCR 2: '.strval($modpep->getTheoreticalMCR('monoisotopic', 2)).'<br />');

/* End of file CustomTestsPeptide.php */
/* Location: ./path/CustomTestsPeptide.php */ 