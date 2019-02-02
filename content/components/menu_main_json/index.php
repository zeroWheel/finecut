<?php

$menuFileName = $info->mainMenu->menuFile;
$menuFilePath = dirname(__FILE__).DIRECTORY_SEPARATOR.$menuFileName;

$menuActiveLink = '';
$menuLinkA = explode('/', $success['pagePath']);
if(isset($menuLinkA[1])){
	$menuActiveLink = '/'.$menuLinkA[1].'/';
}
if(isset($info->mainMenu->active)){
	$menuActiveLink = $info->mainMenu->active;
}

$menu = json_decode(file_get_contents($menuFilePath));

foreach ($menu as &$value) {

	if( isset ($value->type) ){
		if( $value->type == 'link' ){
			
			if( isset ($value->menu) ){
				
				if( $value->link == $menuActiveLink ){
					echo '<li class = "dropdown active">';
				}else{
					echo '<li class = "dropdown">';
				}
				
				echo '<a href = "#" class = "dropdown-toggle" data-toggle = "dropdown">'.$value->title.'<b class = "caret"></b></a>';
				
				echo '<ul class="dropdown-menu">';
				foreach ($value->menu as &$sub) {

					if( isset ($sub->type) ){
						if( $sub->type == 'link' ){
							echo '<li><a href = "'.$success['deep'].$sub->link.'">'.$sub->title.'</a></li>';
						}
						if( $sub->type == 'divider' ){
							echo '<li class = "divider"></li>';
						}
						if( $sub->type == 'header' ){
							echo '<li class = "nav-header">'.$sub->title.'</li>';
						}
					}
				}
				echo '</ul>';
				
			}else{

				if( $value->link == $menuActiveLink ){
					echo '<li class = "active">';
				}else{
					echo '<li>';
				}
				
				echo '<a href="'.$success['deep'].$value->link.'">'.$value->title.'</a>';
			
			}
			
			echo '</li>';
		}
		if( $value->type == 'divider' ){
			echo '<li class = "divider-vertical"></li>';
		}
		if( $value->type == 'header' ){
			echo '<li class = "nav-header">'.$value->title.'</li>';
		}
	}
}

?>