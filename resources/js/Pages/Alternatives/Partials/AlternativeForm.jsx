import Checkbox from "@/Components/Checkbox";
import CheckBoxInput from "@/Components/CheckBoxInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import Primary2Button from "@/Components/Primary2Button";
import SecondaryButton from "@/Components/SecondaryButton";
import SuccessButton from "@/Components/SuccessButton";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import { CirclePlus, FilePen, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AlternativeForm({ alternative }) {
  const { nextCode, products } = usePage().props;

  const [modal, openModal] = useState(false);

  const { data, setData, post, put, errors, reset, processing } = useForm({
    code: alternative?.code || nextCode,
    name: alternative?.name || "",
    products: alternative?.products.map((item) => Number(item.id)) || [],
    description: alternative?.description || "",
  });

  const mode = alternative ? "edit" : "create";
  const title = alternative ? "Edit Alternative" : "Create Alternative";
  const submitLabel = alternative ? "Update" : "Create";

  useEffect(() => {
    if (mode === "create") setData("code", nextCode);
  }, [nextCode, mode]);

  const triggerModal = () => openModal(true);

  const handleCheckboxChange = (id) => {
    if (data.products.includes(id)) {
      setData(
        "products",
        data.products.filter((item) => item !== id)
      );
    } else {
      setData("products", [...data.products, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "create") {
      const createPromise = new Promise((resolve, reject) => {
        post(route("alternatives.store"), {
          preserveScroll: true,
          onSuccess: (response) => {
            reset();
            closeModal();
            resolve(response);
          },
          onError: (error) => {
            reject(error);
          },
        });
      });

      toast.promise(createPromise, {
        loading: "Loading...",
        success: "Alternative created",
        error: "Failed to create alternative",
      });
    } else if (mode === "edit") {
      const updatePromise = new Promise((resolve, reject) => {
        put(route("alternatives.update", alternative.id), {
          preserveScroll: true,
          onSuccess: (response) => {
            closeModal();
            resolve(response);
          },
          onError: (error) => reject(error),
        });
      });

      toast.promise(updatePromise, {
        loading: "Loading...",
        success: "Alternative updated",
        error: "Failed to update alternative",
      });
    }
  };

  const closeModal = () => openModal(false);

  return (
    <>
      {mode === "create" ? (
        <Primary2Button onClick={triggerModal}>
          <CirclePlus className="w-4 h-4 mr-2" />
          {submitLabel}
        </Primary2Button>
      ) : (
        <SuccessButton onClick={triggerModal}>
          <FilePen className="w-4 h-4 mr-2" />
          {submitLabel}
        </SuccessButton>
      )}

      <Modal show={modal} onClose={closeModal}>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>

          <p
            className="mt-1 text-sm text-gray-600"
            style={{ marginTop: "0.25rem" }}
          >
            {mode === "create" ? "Create" : "Edit"} Alternative's information.
          </p>

          <div>
            <InputLabel htmlFor="code" value="Kode Alternatif" />

            <TextInput
              id="code"
              value={data.code}
              onChange={(e) => setData("code", e.target.value)}
              type="text"
              className="mt-1 block w-full read-only:bg-gray-100"
              autoComplete="code"
              disabled
            />

            <InputError message={errors.code} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="name" value="Nama Alternatif" />

            <TextInput
              id="name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              type="text"
              className="mt-1 block w-full"
              autoComplete="name"
            />

            <InputError message={errors.name} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="products" value="Produk" />

            <div className="mt-1 block w-full">
              <div className="flex items-center">
                {products.map((product) => (
                  <label
                    key={product.id}
                    className="flex items-center me-3"
                  >
                    <Checkbox
                      checked={data.products.includes(product.id)}
                      onChange={() => handleCheckboxChange(product.id)}
                    />

                    <span className="ms-2 text-sm text-gray-600">
                      {product.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <InputError message={errors.products} className="mt-2" />
          </div>

          <div>
            <InputLabel htmlFor="description" value="Deskripsi" />

            <TextAreaInput
              id="description"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              className="mt-1 block w-full"
              autoComplete="description"
            />

            <InputError message={errors.description} className="mt-2" />
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

            {mode === "create" ? (
              <Primary2Button className="ms-3" disabled={processing}>
                <PlusCircle className="w-4 h-4 mr-2" />
                {submitLabel}
              </Primary2Button>
            ) : (
              <SuccessButton className="ms-3" disabled={processing}>
                <FilePen className="w-4 h-4 mr-2" />
                {submitLabel}
              </SuccessButton>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
}
