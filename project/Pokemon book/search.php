<html>
    <head><meta charset='utf-8'>
        <title>神奇寶貝圖鑑</title>
        <style>
            a{text-decoration:none;}
            table{margin:30px; width:400px;
                border-collapse: collapse;
            }
            table, th, td { text-align:center;
                            border: 1px solid black;
                            border-color:#FF7F50}
            th{ height:30px;background:#FF7F50;
                height:40; font-size:18px;}
            #Content{position: absolute;
                    width: 400px;
                    left:580px;}
            #leftImage{ position: absolute;
                         margin-left: 50px;
                         top:200px;
            }
        </style>
    </head>
    <body>
        <?php
            $link=mysqli_connect("localhost","root","","pokemon book");
            mysqli_query($link,"set names utf8");
            $name = "$_GET[search]";
        ?>
        <div id="Content">
        <h2>搜尋結果</h2>
        <table>
            <tr>
                <th>編號<th>圖像<th>寶可夢<th>屬性
            <?php
            $data = mysqli_query($link,"SELECT * FROM monsters WHERE`名字`LIKE'%$name%' ORDER BY `編號`");
            $times = mysqli_num_rows($data);
            for($i=0;$i<$times;$i++)
            {
                $rs = mysqli_fetch_row($data);
                $M_id = $rs[0];
                $M_name = $rs[1];
                $M_type = $rs[2];
                $M_charac = $rs[3];
                $href = "basedata.php?monster=";
                $sel3 = mysqli_query($link,"SELECT * FROM `image` WHERE `編號` = '$M_id'");
                $rs3 = mysqli_fetch_row($sel3);
                ?>
                <tr>
                    <td><?php echo $M_id ?>
                    <td><img src=<?php echo "imageData/".$rs3[1]?>  width="40">
                    <td><a href="<?php echo $href,$M_name; ?>"><span><?php echo $M_name; ?></span></a>
                    <td><?php echo $M_type ?>
                <?php
            }
            ?>
            </table>
        </div>
        <div id="leftImage">
            <img src="image/fat.png" width="450">
        </div>
    </body>
</html>