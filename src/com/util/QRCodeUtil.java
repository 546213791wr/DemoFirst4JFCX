package com.util;

import com.google.zxing.*;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Hashtable;

/***
 * 二维码工具
 * 作者：wangbing
 * 日期：20150323
 */
public class QRCodeUtil {
	/***
	 * 二维码生成
	 * @param content 内容
	 * @param width  二维码宽度
	 * @param height 二维码高度
	 * @param filename 生成后的文件名称(完整路径+文件名称)
	 * @return
	 */
	public static boolean bulidQRCode(String content,int width,int height,String filename){
		boolean isok = true;
		String format = filename.substring(filename.indexOf(".")+1);
		Hashtable hints= new Hashtable();
		hints.put(EncodeHintType.CHARACTER_SET, "utf-8");
		try {
			 BitMatrix bitMatrix = new MultiFormatWriter().encode(content, BarcodeFormat.QR_CODE, width, height,hints);
			 File outputFile = new File(filename);
			 try {
				MatrixToImageWriter.writeToFile(bitMatrix, "png", outputFile);

			} catch (IOException e) {
				e.printStackTrace();
				isok = false;
			}
		} catch (WriterException e) {
			e.printStackTrace();
			isok = false;
		}finally{
		 return isok;
		}
	};

	/***
	 * 解码二维码内容
	 * @param filename 图片路径
	 * @return
	 */
	public static String decode(String filename){
		String resultStr = null;
		 try{
			   Reader reader = new MultiFormatReader();
			   //String imgPath = "D://hwy.png";
			   File file = new File(filename);
			   BufferedImage image;
			   try {
			    image = ImageIO.read(file);
			    if (image == null) {
			    System.out.println("Could not decode image");
			    }
			    LuminanceSource source = new BufferedImageLuminanceSource(image);
			    BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));
			    Result result;
			    Hashtable hints= new Hashtable();
			    hints.put(DecodeHintType.CHARACTER_SET, "UTF-8");
			    result = new MultiFormatReader().decode(bitmap,hints);
			    resultStr = result.getText();
			   } catch (IOException ioe) {
			    ioe.printStackTrace();
			   } catch (ReaderException re) {
			    re.printStackTrace();
			   }
			  }catch(Exception ex){
			   ex.printStackTrace();
			  }finally{
				 return resultStr;
			  }
	};


	public static void main(String[] args) {
		String filename = "c:/b.png";
		System.out.println(QRCodeUtil.bulidQRCode("123 你好；#@&", 220, 220, filename));
		System.out.println(QRCodeUtil.decode(filename));
	}

}
