<?php
$status = 'Form was not send yet.';
$sequence = '';
$ismodified = '';
$nterminus = '';
$cterminus = '';
$mod15n = '';
$mod1acc = '';
$mod2acc = '';
$mod3acc = '';
$mod4acc = '';
$mod5acc = '';
$mod1pos = '';
$mod2pos = '';
$mod3pos = '';
$mod4pos = '';
$mod5pos = '';
$spectrum = '';

$pepvalid = '';
$ctermmass = '';
$ntermmass = '';
$pepmass = '';
$pepmcr2 = '';
$pepmcr3 = '';
$pepmcr4 = '';
$specimage = '';



if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
	require_once(dirname(__FILE__).'/../src/PhProt.php');
	$pp = new PhProt();
	$pp->using('base');
	$pp->using('peptide');
	$pp->using('ui');
	
	$status = 'Form was processed.';
	$sequence = array_key_exists('sequence', $_POST) ? $_POST['sequence'] : '';
	$ismodified = array_key_exists('ismodified', $_POST) ? $_POST['ismodified'] : '';
	$nterminus = array_key_exists('nterminus', $_POST) ? $_POST['nterminus'] : '';
	$cterminus = array_key_exists('cterminus', $_POST) ? $_POST['cterminus'] : '';
	$mod15n = array_key_exists('mod15n', $_POST) ? $_POST['mod15n'] : '';
	$mod1acc = array_key_exists('mod1acc', $_POST) ? $_POST['mod1acc'] : '';
	$mod2acc = array_key_exists('mod2acc', $_POST) ? $_POST['mod2acc'] : '';
	$mod3acc = array_key_exists('mod3acc', $_POST) ? $_POST['mod3acc'] : '';
	$mod4acc = array_key_exists('mod4acc', $_POST) ? $_POST['mod4acc'] : '';
	$mod5acc = array_key_exists('mod5acc', $_POST) ? $_POST['mod5acc'] : '';
	$mod1pos = array_key_exists('mod1pos', $_POST) ? $_POST['mod1pos'] : '';
	$mod2pos = array_key_exists('mod2pos', $_POST) ? $_POST['mod2pos'] : '';
	$mod3pos = array_key_exists('mod3pos', $_POST) ? $_POST['mod3pos'] : '';
	$mod4pos = array_key_exists('mod4pos', $_POST) ? $_POST['mod4pos'] : '';
	$mod5pos = array_key_exists('mod5pos', $_POST) ? $_POST['mod5pos'] : '';
	$arrIons = array_key_exists('ioncalc', $_POST) ? $_POST['ioncalc'] : '';
	$iccharge = array_key_exists('iccharge', $_POST) ? $_POST['iccharge'] : '';
	$spectrum = array_key_exists('spectrum', $_POST) ? $_POST['spectrum'] : '';
	
	if ($ismodified === 'true') {
		$pep = new ModifiedPeptide();
		$pepvalid = $pep->setModifiedSequence($sequence) ? 'true' : 'false';
	} else {
		$pep = new Peptide();
		$pep->Sequence = $sequence;
		$pepvalid = $pep->validateSequence($sequence) ? 'true' : 'false';
	}
	
	if ($nterminus !== '') {
		$pep->NTerminus = $nterminus;
	}
	if ($cterminus !== '') {
		$pep->CTerminus = $cterminus;
	}
	
	if ($pepvalid === 'true') {
		if ($cterminus !== '') {
			$ctermmass = strval($pep->getCTerminusMass('monoisotopic'));
		}
		if ($nterminus !== '') {
			$ntermmass = strval($pep->getNTerminusMass('monoisotopic'));
		}
		$mec = $pep->getMec();
		
		$pepmass = strval($pep->getMass('monoisotopic'));
		$pepmcr2 = strval($pep->getTheoreticalMCR('monoisotopic', 2));
		$pepmcr3 = strval($pep->getTheoreticalMCR('monoisotopic', 3));
		$pepmcr4 = strval($pep->getTheoreticalMCR('monoisotopic', 4));
		
		if (!is_numeric($iccharge)) {
			$iccharge = '2';
		}
		
		//-- IonCalculator --
		$ic = new IonCalculator(array(
			'peptide' => $pep,
			'maxcharge' => intval($iccharge),
			'weighttype' => 'monoisotopic',
			'neutralloss' => array('H2O', 'NH3'),
			'customtemplate' => '{ion}{index} {charge}+ {flag}'
		));
		
		$arrIcRes = array();
		foreach ($arrIons as $ion) {
			$arrIcRes += $ic->calculateIon($ion);
		}
		
		//-- Spectrum --
		$validSpec = false;
		if ($spectrum !== '') {
			$spec = new Spectrum();
			$validSpec = $spec->setSpectrumByString($spectrum);
			if ($validSpec === true) {
				$annotSpec = $spec->annotateSpectrum($arrIcRes, 'mass', 'intensity', 'custom', 300, 'ppm');
			}
		}
		
		//-- Ui Spectrum --
		if ($validSpec === true) {
			$specUi = new SpectrumUi(array(
				'drawer' => new PChartDrawer(array(
					'width' => 900,
					'height' => 400,
					'is3D' => false,
					'colors' => array('#888', '#00f'),
					'legend' => 'none'
				)),
				'tofile' => dirname(__FILE__).'/media/spectrum.png',
				'spectrum' => $annotSpec,
				'annotationproperty' => 'custom'
			));
			$specUi->draw();	
			$specimage = '<img src="media/spectrum.png">';
		}
	}
}
?>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
	<title>Demo of PHProt</title>
	
	<script type="text/javascript">
		var toggleHideInput = function() {
			var o = document.getElementById('phprotinput');
			
			if (o.style.display === 'none') {
				o.style.display = 'block';
			} else {
				o.style.display = 'none';
			}
		}
		
		var toggleHideOutput = function() {
			var o = document.getElementById('phprotoutput');
			
			if (o.style.display === 'none') {
				o.style.display = 'block';
			} else {
				o.style.display = 'none';
			}
		}
	</script>
</head>

<body style="font: 10pt sans-serif">
	<h2>Demo of PHProt</h2>
	<h3>Input: <a href="javascript: toggleHideInput()">(hide/show)</a></h3>
	<div id="phprotinput" style="background-color: #dcb; border: 1px solid black; padding: 2px;">
		<form action="index.php" method="post">
			<table>
				<tr><td>Sequence:</td><td><input type="text" name="sequence" value="KDEPAEE(pS)DGDLGFGLFD"></td></tr>
				<tr><td>Contains modifications?:</td><td><input type="checkbox" name="ismodified" value="true" checked="true"></td></tr>
				<tr><td>NTerminus:</td><td><input type="text" name="nterminus" value="H"></td></tr>
				<tr><td>CTerminus:</td><td><input type="text" name="cterminus" value="OH"></td></tr>
				<tr><td>Is 15N labeled?:</td><td><input type="checkbox" name="mod15n" value="true"></td></tr>
				<tr><td>Weighttype:</td><td>
					<input type="radio" name="weighttype[]" value="monoisotopic" checked="true">monoisotopic</input>
					<input type="radio" name="weighttype[]" value="average">average</input>
				</td></tr>
				<tr><td>Spectrum:<br><ul><li>Mass / Intensity pairs separated by a : </li><li>Entries separated by space</li></ul></td><td>
					<textarea name="spectrum">273.20615:50.3 281.18347:183.0 297.75990:173.3 318.60642:196.6 328.03406:110.2 329.67355:121.0 334.17569:41.8 337.16003:543.6 342.51862:129.8 347.26266:558.8 350.29800:27.6 353.24072:127.6 355.28723:897.4 360.13397:46.2 363.75916:87.9 367.29874:35.8 373.15393:922.4 375.14703:736.8 378.72284:68.5 381.28403:66.8 385.88595:53.7 388.02161:120.0 391.37900:107.4 394.21036:355.0 399.17157:43.3 405.71045:172.0 420.13303:372.4 422.97830:104.6 427.30878:589.1 430.32672:98.4 433.23682:401.8 437.25385:343.5 451.14212:848.1 456.52454:131.9 460.29865:338.2 465.87717:175.5 468.23224:435.1 488.18869:393.4 494.28262:417.1 520.29279:365.1 522.75174:1173.2 525.22705:106.8 527.21552:181.1 529.28296:120.2 533.81232:96.0 538.17175:263.8 541.27490:1538.8 547.25519:197.2 550.39496:115.3 552.86136:122.5 555.17957:163.8 558.30554:49.2 561.76181:301.6 565.37927:168.9 571.05786:113.4 575.19702:174.9 580.78486:221.8 584.83122:121.4 587.42065:93.4 593.02966:212.4 598.29352:1649.8 611.75141:386.7 617.89796:437.6 624.68602:335.2 635.26221:556.2 637.73791:444.4 642.37817:551.4 647.64539:103.5 652.31274:1109.2 655.22205:3392.2 660.37006:359.5 664.26453:247.7 667.98260:231.1 670.27905:4757.6 674.33264:503.6 727.97498:742.2 747.36340:719.6 756.94158:1252.9 761.37604:412.6 763.31628:321.0 765.38794:2579.1 768.37317:4154.9 773.60730:603.5 775.39282:456.4 779.10551:320.8 781.84649:1044.8 783.35803:755.5 784.89074:820.8 787.53564:368.0 789.27734:702.1 796.86621:649.2 799.33398:5255.2 801.27795:222.0 803.85963:1360.9 807.24572:1426.0 813.11853:5074.3 816.76929:353.3 819.68591:393.8 822.09021:15509.0 825.85878:266.1 830.69035:1347.0 835.19702:215.2 837.34924:398.1 839.06470:1215.6 842.30237:485.9 844.34319:947.6 857.15710:783.6 861.99402:2767.4 865.19727:489.2 868.43860:1653.4 871.06787:7891.1 877.74665:2366.5 881.67290:2095.1 886.49646:1128.3 921.93401:862.6 924.66356:1830.4 926.77224:970.2 930.57874:1458.8 932.85496:356.9 1001.32544:7.0 1007.97086:414.6 1032.87876:303.6 1040.38550:405.3 1045.06706:419.3 1046.43530:170.6 1048.73181:121.9 1050.61743:226.3 1055.29419:805.2 1062.61927:337.1 1070.96201:321.1 1074.73657:101.2 1078.83142:99.1 1081.75219:2156.8 1084.45325:325.9 1089.76401:398.0 1097.67303:120.6 1102.50075:587.9 1116.96807:350.4 1120.65796:393.9 1124.42882:626.7 1128.03613:93.9 1130.50208:203.0 1134.59119:73.9 1137.87090:731.2 1143.36157:49.5 1147.59460:134.9 1151.36340:76.2 1155.33118:2605.4 1161.21619:158.4 1163.49214:186.8 1166.13256:116.5 1169.53027:90.1 1173.35258:259.4 1175.01505:293.8 1179.64282:754.9 1182.50439:131.6 1185.68701:154.2 1187.33569:175.5 1191.58109:341.0 1194.03564:327.1 1197.93311:246.5 1199.98279:270.4 1201.42529:136.5 1204.24243:748.1 1211.17749:224.0 1214.52258:146.5 1217.94212:344.5 1222.81944:2624.6 1226.33899:25.3 1228.71387:32.2 1232.46298:305.2 1235.93279:973.0 1239.91321:113.6 1245.40577:113.6 1250.45532:928.7 1253.76426:7250.4 1256.59668:226.0 1258.27075:57.2 1260.57727:71.5 1264.08447:262.7 1268.94685:5458.3 1272.34814:334.6 1307.55054:320.8 1325.51526:2021.4 1346.70837:421.1 1348.64908:1020.1 1351.84821:3020.0 1355.04114:68.8 1356.31103:75.1 1358.44299:46.7 1362.71167:258.9 1366.89072:8631.2 1370.40564:87.7 1374.04700:114.6 1377.27368:56.1 1378.80823:81.4 1382.93631:1146.8 1387.94047:103.9 1391.05432:91.8 1393.05737:54.5 1394.67493:29.6 1399.77988:177.5 1402.62585:121.6 1405.47595:358.8 1408.15018:276.6 1413.92444:75.9 1417.74806:258.0 1424.01784:2917.9 1431.87170:137.6 1434.32715:239.0 1439.33121:91.3 1443.34705:344.6 1444.63477:112.9 1450.99084:236.1 1454.38855:709.0 1457.68469:117.0 1462.65430:322.3 1472.99791:2966.8 1480.91516:1313.1 1493.20242:191.0 1496.05870:360.2 1515.05391:304.3 1529.58972:790.4 1533.67444:447.6 1542.92627:136.5 1551.63766:887.6 1562.89172:55.9 1570.99959:6059.6 1574.24569:268.5 1576.38184:84.7 1580.64880:24.5 1585.62891:126.6 1588.59973:92.3 1590.88123:114.5 1592.70081:104.6 1594.60925:267.1 1597.47034:85.5 1600.47083:99.4 1603.77356:187.2 1610.09578:172.9 1613.22458:214.0 1617.05518:51.4 1622.85205:116.3 1625.20694:395.0 1628.04088:1074.8 1633.75403:28.7 1643.23701:1396.4 1648.50952:4468.3 1654.84436:74.1 1658.86365:17.1 1661.90484:357.0 1668.96130:38.8 1673.10425:78.8 1679.57434:281.1 1699.50867:82.2 1701.76782:248.9 1704.42212:121.5 1722.61243:343.9 1728.70300:16.8 1734.82983:19.6 1740.63269:2124.1 1745.66724:67.0 1756.13586:32.9 1760.29848:175.6 1769.08850:19.2 1778.06090:588.6 1786.71179:50.3 1794.08972:39.2 1798.73352:20.0 1804.97180:88.7 1816.62732:45.7 1818.48303:22.3 1828.70081:12.2 1839.75281:52.9 1842.59143:27.4 1856.84338:14.0 1868.73621:14.5 1873.74768:44.9 1875.47729:9.9 1888.10229:13.8 1893.16492:5.5 1903.27173:35.3 1922.04724:18.2 1932.64624:11.4 1939.83728:59.9 1953.80835:9.1 1970.62952:16.0 1985.79797:7.0</textarea>
				</td></tr>
			</table>
			<hr>
			<br>
			<b>Add additional modifications manually:</b><br>
			<a href="acclist.html">A list of possible modification accessions.</a>
			<table>
				<tr><th>&nbsp;</th><th>Mod accession</th><th>Mod position (starting with 1)</th></tr>
				<tr><td>Mod1:</td><td><input type="text" name="mod1acc" value=""></td><td><input type="text" name="mod1pos" value=""></td></tr>
				<tr><td>Mod2:</td><td><input type="text" name="mod2acc" value=""></td><td><input type="text" name="mod2pos" value=""></td></tr>
				<tr><td>Mod3:</td><td><input type="text" name="mod3acc" value=""></td><td><input type="text" name="mod3pos" value=""></td></tr>
				<tr><td>Mod4:</td><td><input type="text" name="mod4acc" value=""></td><td><input type="text" name="mod4pos" value=""></td></tr>
				<tr><td>Mod5:</td><td><input type="text" name="mod5acc" value=""></td><td><input type="text" name="mod5pos" value=""></td></tr>
			</table>
			<hr>
			<table>
				<tr><td>Ions to calculate:</td><td>
					<input type="checkbox" name="ioncalc[]" value="a">a</input>
					<input type="checkbox" name="ioncalc[]" value="b" checked>b</input>
					<input type="checkbox" name="ioncalc[]" value="c">c</input>
					<input type="checkbox" name="ioncalc[]" value="d">d</input>
					<input type="checkbox" name="ioncalc[]" value="v">v</input>
					<input type="checkbox" name="ioncalc[]" value="w">w</input>
					<input type="checkbox" name="ioncalc[]" value="x">x</input>
					<input type="checkbox" name="ioncalc[]" value="y" checked>y</input>
					<input type="checkbox" name="ioncalc[]" value="z">z</input>
				</td></tr>
				<tr><td>Charge for ion calc:</td><td><input type="text" name="iccharge" value="2"></td></tr>
				
			</table>	
			<br>
			<input type="submit" value="Submit">
			
		</form>
	</div>
	<br>
	
	<h3>Output: <a href="javascript: toggleHideOutput()">(hide/show)</a></h3>
	<div id="phprotoutput" style="background-color: #bcd; border: 1px solid black; padding: 2px;">
		<b>Status: <?php print($status) ?></b>
		<table>
			<tr><td>Sequence:</td><td><?php print($sequence) ?></td></tr>
			<tr><td>Contains modifications?:</td><td><?php print($ismodified) ?></td></tr>
			<tr><td>NTerminus:</td><td><?php print($nterminus) ?></td></tr>
			<tr><td>CTerminus:</td><td><?php print($cterminus) ?></td></tr>
			<tr><td>Is 15N labeled?:</td><td><?php print($mod15n) ?></td></tr>
			
			<tr><td>Modification1:</td><td><?php print($mod1acc.' at '.$mod1pos) ?></td></tr>
			<tr><td>Modification1:</td><td><?php print($mod2acc.' at '.$mod2pos) ?></td></tr>
			<tr><td>Modification1:</td><td><?php print($mod3acc.' at '.$mod3pos) ?></td></tr>
			<tr><td>Modification1:</td><td><?php print($mod4acc.' at '.$mod4pos) ?></td></tr>
			<tr><td>Modification1:</td><td><?php print($mod5acc.' at '.$mod5pos) ?></td></tr>
		</table>
		<hr>
		<table>
			<tr><td>Peptide valid:</td><td><?php print($pepvalid) ?></td></tr>
			<tr><td>Molar extinction coefficent:</td><td><?php print($mec) ?></td></tr>
			<tr><td>CTerminus mass:</td><td><?php print($ctermmass) ?></td></tr>
			<tr><td>NTerminus mass:</td><td><?php print($ntermmass) ?></td></tr>
			<tr><td>Peptide mass:</td><td><?php print($pepmass) ?></td></tr>
			<tr><td>m/z with z=2:</td><td><?php print($pepmcr2) ?></td></tr>
			<tr><td>m/z with z=3:</td><td><?php print($pepmcr3) ?></td></tr>
			<tr><td>m/z with z=4:</td><td><?php print($pepmcr4) ?></td></tr>
		</table>
		
		<h2>Spectrum</h2>
		<?php print($specimage) ?>
		
	</div>
	
</body>
	
	
	
</html>