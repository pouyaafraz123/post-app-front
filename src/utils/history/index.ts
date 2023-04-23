import { useLocation, useParams } from "react-router-dom";

export const useUpdateMode = () => {
  const loc = useLocation();
  const id = useParams<{ id: string }>()?.id;
  if (!loc.pathname.includes("edit")) {
    return { isEditing: false };
  } else {
    return { isEditing: true, id: Number(id) };
  }
};
