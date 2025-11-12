import UserList from "@/components/UserList";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 ml-6">Usuários</h1>
      <UserList />
    </div>
  );
}
