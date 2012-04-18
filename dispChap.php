<?php
include_once('php/initDispChap.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title><?php echo $title; ?> - thegoodbook.us </title>
	<meta name="description" content="<?php echo $description; ?>">
	<meta charset="utf-8">
	<meta name="HandheldFriendly" content="True">
	<meta name="viewport" content="width=device-width">
	<link rel="stylesheet" href="//code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.css" />
	<link rel="stylesheet" href="/css/main.css?v=4" />
	<script src="/js/libs/jquery-1.7.1.min.js"></script>
    <script src="/js/libs/jquery-ui-hlight.min.js"></script>
	<script src="//code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.js"></script>
	<script src="/js/main.js?v=1"></script>
</head>
<body>
<div data-role="page" id="<?php echo $unique_id; ?>" class="chapter" data-add-back-btn="true">
    <div data-role="header">
        <h1><?php echo $header; ?></h1>
    </div>
    <div data-role="content">
        <div>
            <?php foreach($result_array as $result): ?>
            <p class="verse" id="<?php echo $result['id']; ?>" data-verse-title="<?php echo $result['book']. ' ' .$result['cap']. ':' .$result['verse']; ?>"><span class="innerVerse"><sup><?php echo $result['verse'];?></sup><?php echo $result['line'];?></span></p>
            <?php endforeach;?>
        </div>
        <div data-role="footer" data-position="fixed" data-id="footerMenu">
            <div data-role="navbar" data-iconpos="top">
                <ul>
                    <li>
                        <select name="hlightSel" id="hlightSel" class="hlightSel" data-corners="false" data-icon="arrow-u" data-iconpos="top" data-mini="true" data-native-menu="false" data-theme="b"> 
                            <option data-placeholder="true">Highlight</option>
                            <option value="blue" id="blueOpt">Blue</option>
                            <option value="pink" id="pinkOpt">Pink</option>
                            <option value="yellow" id="yellowOpt">Yellow</option>
                            <option value="delHlight">Delete</option>
                        </select>
                    </li>
                    <li>
                    	<a data-role="button" class="addNoteBtn" data-icon="arrow-u" data-theme="b">+ Note</a>
                    </li>
                    <li>
                    	<a data-role="button" class="addBmarkBtn" data-icon="custom-bmark" data-theme="b">Bookmark</a>
                    </li>
                </ul>
            </div>
            <div data-role="navbar">
                <ul>
                    <li><a href="/<?php echo "$prev_book/$prev_chapter"; ?>" data-icon="arrow-l" data-transition="slide" data-direction="reverse" rel="nofollow">Prev</a></li>
                    <li><a href="/index.php" data-icon="grid" data-transition="slideup">Nav</a></li>
                    <li><a href="/<?php echo "$next_book/$next_chapter"; ?>" data-icon="arrow-r" data-transition="slide" rel="nofollow">Next</a></li>
                </ul>
            </div>
        </div><!-- /footer -->			
    </div><!-- /content -->
</div><!-- /page #uniqueId -->
</body>
</html>