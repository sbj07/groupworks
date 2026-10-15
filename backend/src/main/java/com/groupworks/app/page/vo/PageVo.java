package com.groupworks.app.page.vo;

import lombok.Data;

@Data
public class PageVo {
	private String writerNo;
	private String loginMemberNo;
	private int listCount;		
	private int currentPage;
	private int pageLimit;		
	private int boardLimit;	
	
	private int maxPage;		
	private int startPage;	
	private int endPage;		
	
	private int startRow;		
	private int lastRow;		
	
	//������
	public PageVo(int listCount , int currentPage , int pageLimit, int boardLimit) {
		this.listCount = listCount;
		this.currentPage = currentPage;
		this.pageLimit = pageLimit;
		this.boardLimit = boardLimit;
		
		this.maxPage = (int) Math.ceil((double)listCount/boardLimit);
		this.startPage = (currentPage - 1) / pageLimit * pageLimit + 1;
		this.endPage = startPage + pageLimit - 1;
		
		if(endPage > maxPage) {
			endPage = maxPage;
		}
		
		this.startRow = (currentPage - 1) * boardLimit + 1;
		this.lastRow = startRow + boardLimit - 1;
	}
	
	
//
//	public int getStartRow() {
//		return startRow;
//	}
//
//
//
//	public int getLastRow() {
//		return lastRow;
//	}
//
//
//
//	public int getListCount() {
//		return listCount;
//	}
//
//	public int getCurrentPage() {
//		return currentPage;
//	}
//
//	public int getPageLimit() {
//		return pageLimit;
//	}
//
//	public int getBoardLimit() {
//		return boardLimit;
//	}
//
//	public int getMaxPage() {
//		return maxPage;
//	}
//
//	public int getStartPage() {
//		return startPage;
//	}
//
//	public int getEndPage() {
//		return endPage;
//	}
//	
	
	

}