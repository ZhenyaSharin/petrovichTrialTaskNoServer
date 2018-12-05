<?php
$data_json = file_get_contents('products.json'); // получение данных json
$data_ready = json_decode($data_json,true); // декодинг данных json в array
$err_json = 'error unknown'; // варианты ошибок
switch (json_last_error()) {
	case  JSON_ERROR_NONE:
		$err_json = '';
		break;
	case JSON_ERROR_DEPTH:
		$err_json = 'max depth of stack';
		break;
	case JSON_ERROR_STATE_MISMATCH:
		$err_json = 'mismatch of modes';
		break;
	case JSON_ERROR_CTRL_CHAR:
		$err_json = 'uncorrect char';
		break;
	case JSON_ERROR_SYNTAX:
		$err_json = 'syntax error';
		break;
	case JSON_ERROR_UTF8:
		$err_json = 'uncorrect code (utf8)';
		break;
	default:
		$err_json = 'unknown error';
		break;
}
if ($err_json !='') {
	echo $err_json;       // вывод ошибки
} else {
	echo '<pre>';		// вывод данных
	print_r($data_ready);
	echo '</pre>';
}