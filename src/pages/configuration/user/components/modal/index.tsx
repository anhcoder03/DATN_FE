import { Modal, ModalProps } from "antd";
import React, { startTransition, useImperativeHandle, useState } from "react";
import { deleteUser } from "../../../../../services/user.service";
import { toast } from "react-toastify";

export type ConfigUserModalProps = {
  onSuccess?: () => void;
} & ModalProps;
export type ConfigUserModalMethod = {
  open: (id?: string) => void;
};

const ConfigUserModal = React.forwardRef<
  ConfigUserModalMethod,
  ConfigUserModalProps
>(({ onSuccess, ...p }, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>();
  useImperativeHandle(ref, () => ({
    open: (id) => {
      startTransition(() => {
        setId(id);
        setOpen(true);
      });
    },
  }));

  const onOk = async () => {
    const res = await deleteUser(id);
    if (res?.user) {
      toast.success(res?.message);
      onSuccess?.();
    } else {
      toast.error(res?.message);
    }
    setOpen(false);
  };
  return (
    <Modal
      {...p}
      centered
      open={open}
      onOk={onOk}
      onCancel={() => setOpen(false)}
    >
      <h1 className="text-[#4b4b5a] pb-4 border-b border-b-slate-200 font-bold text-center text-[18px]">
        Thông Báo
      </h1>
      <div className="flex flex-col items-center justify-center py-4 text-sm">
        <p>Bạn có chắc muốn xoá không?</p>
      </div>
    </Modal>
  );
});

export default ConfigUserModal;
