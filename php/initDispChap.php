<?php
include_once('Database.php');
if(isset($_GET['book'])){
	$book = $_GET['book'];
} else {
$book = 'Genesis';
}
if(isset($_GET['chapter'])){
	$chapter = $_GET['chapter'];
} else {
	$chapter = 1;
}
$db = new Database();
$db->connect();
$result_array = $db->query("SELECT * FROM `bible` WHERE `book` = '$book' AND `cap` = $chapter");
$result_array2 = $db->query("SELECT * FROM `bible` WHERE `book` = '$book' AND `cap` = $chapter");
foreach($result_array2 as $result2){
	$increment += 1;
	if($increment == 1){
		$header = $result2['book']. ' ' . $result2['cap'];
		$title = $result2['book']. ' ' .$result2['cap'] . ' - ' . substr($result2['line'],0,70);
		$description = $result2['book']. ' ' .$result2['cap'] . ' - ' . substr($result2['line'],0,160);
		$unique_id = $result2['id'];
		$prev_chapter_id = $result2['id'] -1;
		$prev_array = $db->query("SELECT * FROM `bible` WHERE `id` = '$prev_chapter_id'");
		foreach($prev_array as $prev){
			$prev_book = $prev['book'];
			$prev_chapter = $prev['cap'];
		}
	}
	$next_chapter_id = $result2['id'] + 1;
	$next_array = $db->query("SELECT * FROM `bible` WHERE `id` = '$next_chapter_id'");
	foreach($next_array as $next){
		$next_book = $next['book'];
		$next_chapter = $next['cap'];
	}
}
?>