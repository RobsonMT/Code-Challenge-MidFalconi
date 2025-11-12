import UserForm from "@/components/UserForm";

type Params = { params: { id: string } };

export default function EditUserPage({ params }: Params) {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 text-center">Editar Usuário</h1>
      <UserForm id={params.id} />
    </div>
  );
}
