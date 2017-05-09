<?php

	header ( "Content-type:text/html;charset=utf-8" );  //统一输出编码为utf-8
	header('Access-Control-Allow-Origin:*');


	if(count($_POST)>0){

		$u_name = $_POST["userName"];
		$u_pwd = $_POST["userPwd"];

		$u_tel = $_POST["userTel"];


		//与数据库建立连接

		$sqlServer = "127.0.0.1" ;
		$sqlLogin = "root";
		$sqlPwd = "";
		$sqldb = "banggou";

		$con = new mysqli($sqlServer,$sqlLogin,$sqlPwd,$sqldb);

		//设置字符集
		mysqli_query($con,"set names utf8");


		//检测连接

			if($con->connect_error){

				print_r("连接失败");
			}else{


				$sql = "select * from userinfo where u_name='".$u_name."' and u_pwd='".$u_pwd."'";

				$result = $con->query($sql);

				// print_r($result->num_rows);

				if($result->num_rows>0){

					$arr = array();
					$arr["status"] = 0;
					$arr["str"] = "注册失败,该用户已存在";

					print_r(json_encode($arr));

				}else{

					$sql1 = "insert into userinfo(u_name,u_pwd,u_tel) values('".$u_name."','".$u_pwd."','".$u_tel."')";

					$result1 = $con->query($sql1);

					if($result1>0){

						$arr = array();
						$arr["status"] = 1;
						$arr["str"] = "注册成功";

						print_r(json_encode($arr));
					}else{
						$arr = array();
						$arr["status"] = 0;
						$arr["str"] = "注册失败";

						print_r(json_encode($arr));
					}
				}
			}

	}else{

		$arr = array();
		$arr["status"] = 1111;
		$arr["str"] = "没有参数";

		print_r(json_encode($arr));
	}







?>