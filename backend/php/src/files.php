<?php

/**
 * Author: Joshua Carter
 * Created: 25/01/2018
 * Edited: 22/02/2018
 */

//allows local post requests
header("Access-Control-Allow-Origin: *");

/**
 * Echos an error message back to the client
 * @param message [string] the message to send
 */
function echo_err($message)
{
	//create json message
	$data = [];
	array_push($data, array(
		"error" => $message
	));

	//echo to client
	echo json_encode($data);
}

/**
 * Echos the contents of the request file
 * @param file [string] file name
 */
function serve_json_file($file)
{
	//get list of files that can be served
	$served_files = scandir("./served_files");

	//if requested file is a match
	if (in_array($file, $served_files)) {
		//get file contents
		$data = file_get_contents("./served_files/" . $file);
		//echo to client
		echo $data;
	}
	//else no matching file
	else {
		//throw error at client
		echo_err("Could not retrieve <strong>$file</strong> from file server.");
	}
}

/**
 * Entry point for program, handles all post requests
 */
function main()
{
	//check for valid request data
	if (isset($_GET['file'])) {
		//serve requested file
		serve_json_file($_GET['file']);
		return;
	}

	//throw error at client
	echo_err("Request to file server is missing or invalid.");
}

//execute script
main();