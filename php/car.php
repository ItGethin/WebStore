<?php 
	
	$u_name = $_GET["u_name"];
	//连接数据库

	$conn = new mysqli("127.0.0.1","root","","banggou");

	//设置字符集
	$conn->query("set names utf8");

	

	$sql = "select * from cat where u_name = '$u_name'";


	 $data = array(
	        "code" => 0,
	        "msg"  => "查询成功"
	  );
	//执行sql语句
	$result = $conn->query($sql);

	if($result->num_rows>0){

		while ($row = $result->fetch_assoc()) {
			
			$data['data'][] = $row;
		}
		

	}else{
		$data['code'] = -1;
        $data['msg'] = "查询失败，请稍后再试！！";
	}

	
	echo json_encode($data);

	$conn->close();

 ?>