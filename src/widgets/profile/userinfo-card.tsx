export const UserInfoCard = () => {
  return (
    <section className="rounded-medium gap-4 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg  text-gray-900">학번</h2>
        <h2 className="text-lg  text-gray-900">"{ }학년 { }반 { }번"</h2>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg  text-gray-900">아이디</h2>
        <h2 className="text-lg  text-gray-900">{ }</h2>
      </div>
    </section>
  );
};
