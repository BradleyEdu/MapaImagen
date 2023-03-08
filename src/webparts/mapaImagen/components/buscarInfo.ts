import { SPHttpClient } from '@microsoft/sp-http';

const buscarInfo = async (index: number, context: any) => {
    const listName = 'InformacionCasillas';
    const apiUrl = `/_api/web/lists/getbytitle('${listName}')/items(1)`;

    const response = await  context.spHttpClient.get(
      context.pageContext.web.absoluteUrl + apiUrl,
      SPHttpClient.configurations.v1);
    
    if (!response.ok) {
      const responseText =  response.text();
      throw new Error(responseText);
    }
  
    const responseJson = await  response.json();

    console.log(responseJson);
    return responseJson;
}

export default buscarInfo;