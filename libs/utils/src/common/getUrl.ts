import URL from 'url';

export const getUrl = (url: string) => {
  const urlObject = new URL(url);
  const hostName = urlObject.hostname;

  const arrayHostName = hostName.split('.');
  const onlyWebName = arrayHostName[1];

  return {
    hostName,
    onlyWebName,
  };
};
