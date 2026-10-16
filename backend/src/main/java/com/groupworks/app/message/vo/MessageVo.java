package com.groupworks.app.message.vo;

import lombok.Data;

/**
 * 쪽지. 보낼 때 보낸 사람 몫과 받은 사람 몫으로 두 줄을 저장하고(MEMBER_NO = 그 줄의 주인),
 * 각자 지워도 상대방 쪽지함에는 남는다.
 */
@Data
public class MessageVo {

	private String no;
	private String memberNo;
	private String sendNo;
	private String recieveNo;
	private String content;
	private String sendDate;

	// 목록에서 보여줄 상대방 정보 (받은 쪽지면 보낸 사람, 보낸 쪽지면 받은 사람)
	private String partnerNo;
	private String partnerName;
	private String partnerDepartName;
	private String partnerPositionName;

}
