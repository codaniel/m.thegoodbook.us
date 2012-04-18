<?php include_once('php/head.php'); ?>
<body>
<div data-role="page" id="navigation" data-external-page="true">
    <div data-role="content">
        <div id="logo"> <img src="images/logo.png" width="300" height="100" /> </div>
        
        <p> If this is your first visit please read our <a href="instructions.php">User Manual</a> </p>
        
        <ul data-role="listview" data-inset="true" data-divider-theme="a">
            <li data-role="list-divider">Navigation</li>
            <li><a href="/nav/old/">Old Testament</a></li>
            <li><a href="/nav/new/">New Testament</a></li>
        </ul>
        
        <ul id="bookmarks" data-role="listview" data-inset="true" data-divider-theme="a">
            <li data-role="list-divider">Bookmarks</li>
        </ul>
    </div>
</div>
</body>
