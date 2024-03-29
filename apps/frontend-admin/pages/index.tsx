import styled from 'styled-components';
import VideoManagement from '../components/video-components/VideoManagement';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  const docs = [
    {
      uri: 'https://bookstore-ctu.s3.ap-northeast-2.amazonaws.com/AoNhom.docx',
    }, // Remote file
    {
      uri: 'https://bookstore-ctu.s3.ap-northeast-2.amazonaws.com/Roadmap+-+HUYNH+DANH+LANG.xlsx',
    }, // Local File
    {
      uri: 'https://bookstore-ctu.s3.ap-northeast-2.amazonaws.com/addresses.csv',
    }, // Local File
    {
      uri: 'https://bookstore-ctu.s3.ap-northeast-2.amazonaws.com/file_example_XLS_5000.xls',
    }, // Local File
    {
      uri: 'https://bookstore-ctu.s3.ap-northeast-2.amazonaws.com/Hoi+Dong+LVTN_CNPM_HK1_22_23_Chinh+thuc+(1).pdf',
    }, // Local File
    {
      uri: 'https://bookstore-ctu.s3.ap-northeast-2.amazonaws.com/M-TT-03-pdgia_coquan.doc',
    }, // Local File
  ];

  // return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
  return (
    <VideoManagement />
    // <StyledPage>

    // </StyledPage>
  );
}

export default Index;
