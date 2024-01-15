  // Material Dashboard 2 React components
  import MDBox from "components/MDBox";
  import MDTypography from "components/MDTypography";
  import MDAvatar from "components/MDAvatar";
  import MDBadge from "components/MDBadge";

  // Images
  import team2 from "assets/images/team-2.jpg";
  import team3 from "assets/images/team-3.jpg";
  import team4 from "assets/images/team-4.jpg";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";

  // export default function data() {
    const Data = () => {

      const navigate = useNavigate();
      const [data, setData] = useState([]);

        //fetch 를 이용해서 데이터 준비
        const [organVoList , setOrganVoList] = useState([]);
        const loadOrganVoList = () => {
            fetch("http://127.0.0.1:8888/app/organ/list")
            .then( resp => resp.json() )
            .then( (x) => { setOrganVoList(x); } )
            ;
        }
    
        useEffect( () => {
            console.log("useEffect 호출됨 ~~~");
            loadOrganVoList();
        }, [] );




    const Author = ({ image, name, email }) => (

      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar src={image} name={name} size="sm" />



        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {name}
          </MDTypography>
          <MDTypography variant="caption">{email}</MDTypography>
        </MDBox>
      </MDBox>
    );

    const Job = ({ title, description }) => (
      <MDBox lineHeight={1} textAlign="left">
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
          {title}
        </MDTypography>
        <MDTypography variant="caption">{description}</MDTypography>
      </MDBox>
    );




  // 기존 코드
    // const Author = ({ image, name, email }) => (
    //   <MDBox display="flex" alignItems="center" lineHeight={1}>
    //     <MDAvatar src={image} name={name} size="sm" />
    //     <MDBox ml={2} lineHeight={1}>
    //       <MDTypography display="block" variant="button" fontWeight="medium">
    //         {name}
    //       </MDTypography>
    //       <MDTypography variant="caption">{email}</MDTypography>
    //     </MDBox>
    //   </MDBox>
    // );

    // const Job = ({ title, description }) => (
    //   <MDBox lineHeight={1} textAlign="left">
    //     <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
    //       {title}
    //     </MDTypography>
    //     <MDTypography variant="caption">{description}</MDTypography>
    //   </MDBox>
    // );

    return {


      columns: [
        { Header: "이름 / 이메일", accessor: "author", width: "45%", align: "left" },
        { Header: "직책", accessor: "function", align: "left" },
        { Header: "상태", accessor: "status", align: "center" },
        { Header: "전화번호", accessor: "employed", align: "center" },
        { Header: "쪽지", accessor: "action", align: "center" },
        // 기존코드
        // { Header: "author", accessor: "author", width: "45%", align: "left" },
        // { Header: "function", accessor: "function", align: "left" },
        // { Header: "status", accessor: "status", align: "center" },
        // { Header: "employed", accessor: "employed", align: "center" },
        // { Header: "action", accessor: "action", align: "center" },
      ],


  // 기존코드
      // const rows = data.map((item, index) => (
      //   <div key={index}>
      //     <div>{item.author}</div>
      //     <div>{item.function}</div>
      //     <div>{item.status}</div>
      //     <div>{item.employed}</div>
      //     <div>{item.action}</div>
      //   </div>
      // ));

      rows: [
        {
          author: <Author image={team2} name="이름" email="john@creative-tim.com" />,
          function: <Job title="Manager" description="Organization" />,
          status: (
            <MDBox ml={-1}>
              <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
          employed: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              23/04/18
              {/* vo.tel */}
            </MDTypography>
          ),
          action: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              <button >쪽지</button>
            </MDTypography>
          ),
        },

// ...rows.map((row, index) => <div key={index}>{row}</div>)



        // {
        //   author: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        //   function: <Job title="Manager" description="Organization" />,
        //   status: (
        //     <MDBox ml={-1}>
        //       <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
        //     </MDBox>
        //   ),
        //   employed: (
        //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        //       23/04/18
        //       {/* vo.tel */}
        //     </MDTypography>
        //   ),
        //   action: (
        //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        //       <button >쪽지</button>
        //     </MDTypography>
        //   ),
        // },
        // {
        //   author: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
        //   function: <Job title="Programator" description="Developer" />,
        //   status: (
        //     <MDBox ml={-1}>
        //       <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
        //     </MDBox>
        //   ),
        //   employed: (
        //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        //       11/01/19
        //     </MDTypography>
        //   ),
        //   action: (
        //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        //       Edit
        //     </MDTypography>
        //   ),
        // },
        // {
        //   author: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
        //   function: <Job title="Executive" description="Projects" />,
        //   status: (
        //     <MDBox ml={-1}>
        //       <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
        //     </MDBox>
        //   ),
        //   employed: (
        //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        //       19/09/17
        //     </MDTypography>
        //   ),
        //   action: (
        //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        //       Edit
        //     </MDTypography>
        //   ),
        // },
        // {
        //   author: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
        //   function: <Job title="Programator" description="Developer" />,
        //   status: (
        //     <MDBox ml={-1}>
        //       <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
        //     </MDBox>
        //   ),
        //   employed: (
        //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        //       24/12/08
        //     </MDTypography>
        //   ),
        //   action: (
        //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        //       Edit
        //     </MDTypography>
        //   ),
        // },
        // {
        //   author: <Author image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
        //   function: <Job title="Manager" description="Executive" />,
        //   status: (
        //     <MDBox ml={-1}>
        //       <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
        //     </MDBox>
        //   ),
        //   employed: (
        //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        //       04/10/21
        //     </MDTypography>
        //   ),
        //   action: (
        //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        //       Edit
        //     </MDTypography>
        //   ),
        // },
        // {
        //   author: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
        //   function: <Job title="Programator" description="Developer" />,
        //   status: (
        //     <MDBox ml={-1}>
        //       <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
        //     </MDBox>
        //   ),
        //   employed: (
        //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        //       14/09/20
        //     </MDTypography>
        //   ),
        //   action: (
        //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        //       Edit
        //     </MDTypography>
        //   ),
        // },

      ],
    };
  }

  export default Data;