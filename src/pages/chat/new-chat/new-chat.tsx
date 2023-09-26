export const NewChat = (): JSX.Element => {
  const chatId = useMatch().ownData;
  return <Navigate replace to={`../../contacts/${chatId}`} />;
};
