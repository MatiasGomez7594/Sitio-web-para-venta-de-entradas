<?php
// Start the session
session_start();

//$dirBase = '/permisos';

$flashMessages = null;
$flashErrors = null;
$flashOld = null;
if (isset($_SESSION['flash'])) {
    if (isset($_SESSION['flash']['messages'])) {
        $flashMessages = $_SESSION['flash']['messages'];
    }
    if (isset($_SESSION['flash']['errors'])) {
        $flashErrors = $_SESSION['flash']['errors'];
    }
    if (isset($_SESSION['flash']['old'])) {
        $flashOld = $_SESSION['flash']['old'];
    }
}
unset($_SESSION['flash']);
