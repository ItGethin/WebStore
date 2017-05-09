<?php 
	
	//拿到前端给的数据
	$p_name = $_POST["p_name1"];
	$p_price = $_POST["p_price1"];
	$p_num = $_POST["p_num1"];
	$u_name = $_POST["u_name"];
	//连接数据库

	$conn = new mysqli("127.0.0.1","root","","banggou");

	//设置字符集
	$conn->query("set names utf8");

	$data = array(
		'code' => 1,
		'msg' => "注册成功"
	 );

	$sql = "insert into cat (p_name,p_price,p_num,u_name) values('$p_name','$p_price','$p_num','$u_name')";


	//执行sql语句
	$result = $conn->query($sql);

	if(!$result){

		$data["code"] = 0;
		$data["msg"] = "注册失败";

	}

	echo json_encode($data);


	$conn->close();

 ?>