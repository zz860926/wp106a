<html>
    <head><meta charset='utf-8'>
        <title>神奇寶貝圖鑑</title>
        <style>
        table, th, td { border: 1px solid black;
                        text-align:center;
                        height:25;
                        border-color:#FF7F50}
        table{border-collapse: collapse;}
        th{background:#FF7F50;}
        .title{
            height:50; font-size:20px;
        }
        #Content{position: absolute;
            width: 1000px;
            left:300px;}
        #leftcontent {
            float: left;
        }
        #rightcontent {
            float: left;
        }
        #leftImage{ position: absolute;
                         top:400px;
            }
        #rightImage{ position: absolute;
                     margin-left: 1150px;
                     top:500px;
            }
        </style>
    </head>
    <body>
    <h1>搜尋結果</h1>
        <?php
            $link=mysqli_connect("localhost","root","","pokemon book");
            mysqli_query($link,"set names utf8");
            $M_name = "$_GET[monster]";
        ?>
        <div id="Content">
        <div id="leftContent">
            <?php
            $sel = mysqli_query($link,"SELECT * FROM `monsters` WHERE `名字` = '$M_name'");
            $rs = mysqli_fetch_row($sel);
            $sel2 = mysqli_query($link,"SELECT * FROM `skill` WHERE `編號` = '$rs[0]'");
            $sel3 = mysqli_query($link,"SELECT * FROM `image` WHERE `編號` = '$rs[0]'");
            $rs3 = mysqli_fetch_row($sel3);
            ?>
            <table style="width:320px";>
                <tr>
                    <th class="title">
                        <?php echo $rs[1]?></th>
                    <th class="title">
                        <?php echo $rs[0]?></th>
                <tr>
                    <td colspan = 2><img src=<?php echo "imageData/".$rs3[1]?>  width="300">
                <tr>
                    <th>屬性<th>特性
                <tr>
                    <td><?php echo $rs[2]?><td><?php echo $rs[3]?>
            </table>
        </div>
        <div id="rightContent">
        <table  style="width:500px";>
                <tr>
                    <th>等級<th>招式<th>屬性<th>分類<th>威力<th>命中<th>PP
                <?php
                    $times = mysqli_num_rows($sel2);
                    for($i=0;$i<$times;$i++)
                    {
                        $rs2 = mysqli_fetch_row($sel2);
                        $LV = $rs2[1];
                        $move = $rs2[2];
                        $type = $rs2[3];
                        $move_type = $rs2[4];
                        $power = $rs2[5];
                        $accuracy = $rs2[6];
                        $move_PP = $rs2[7];

                ?>
                <tr>
                    <td><?php echo $LV?><td><?php echo $move?><td><?php echo $type?><td><?php echo $move_type?>
                    <td><?php echo $power?><td><?php echo $accuracy?><td><?php echo $move_PP?>
                <?php
                    }
                ?>
            </table>
        </div>
        <div class="clearfloat"></div>
        </div>
        <div id="leftImage">
            <img src="image/pika2.png" width="300">
        </div>
        <div id="rightImage">
            <img src="image/4.jpg" width="350">
        </div>
    </body>
</html>