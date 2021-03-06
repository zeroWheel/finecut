<?php
	
	$settingsPath = dirname(__FILE__).DIRECTORY_SEPARATOR.'settings.php';
	include_once $settingsPath;

	$action = ''; $data = '';
	if( isset( $_POST['action'] ) ){ $action = $_POST['action']; }
	if( isset( $_POST['data'] ) ){ $data = $_POST['data']; }
	
	if( $action == 'clear_cache' ){
		$root = dirname( dirname(__FILE__) ).DIRECTORY_SEPARATOR;
		$path = dirname( dirname(__FILE__) ).DIRECTORY_SEPARATOR.$static;
		if($root !== $path){
			function _remove($path){
				if (!is_dir($path)) {
					if (!@unlink($path)) {
						die('Unable to remove cause not exist.'."\n".$path);
					}
				} else {
					$ls = scandir($path);
					for ($i=0; $i < count($ls); $i++) {
						if ('.' != $ls[$i] && '..' != $ls[$i]) {
							_remove($path.DIRECTORY_SEPARATOR.$ls[$i]);
						}
					}
					if (!@rmdir($path)) {
						die('Unable to remove.'."\n".$path);
					}
				}
				return true;
			}
			if( _remove($path) ){ echo 'Cache was successfully destroyed !'; }
		}
	}

	if( $action == 'settings' ){
		$JSONval = json_decode($data);
		$val = $JSONval->val;
		if( $val !== '' ){
			$fh = fopen($settingsPath, 'w') or die("can't open file");
			fwrite($fh, $val);
			@chmod( $fh, $perm_file );
			fclose($fh);
		}
		readfile($settingsPath);
	}

	if( $action == 'settings_path' ){
		if( $data == '' ){
			$drt = $_SERVER["DOCUMENT_ROOT"];
			$sfn = $_SERVER["SCRIPT_FILENAME"];
			$dsfn = dirname(dirname( $sfn ));
			$prepath = '';
			$root = $dsfn;
			if($drt !== $dsfn.'/'){
				$drt = '/'.preg_replace( '/\//' , '\\/' , $drt ).'/';
				$prepath = preg_replace( $drt, '', $root );
			}
			echo $prepath;
		}
	}
	