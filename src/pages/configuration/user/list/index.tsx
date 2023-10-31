import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconEdit from '../../../../assets/images/icon-edit.png';
import Heading from '../../../../components/common/Heading';
import { IconTrash } from '../../../../components/icons';
import { Layout } from '../../../../components/layout';
import { Pagination } from '../../../../components/pagination';
import { Table } from '../../../../components/table';
import { getAllUser } from '../../../../services/user.service';
import { IUser } from '../../../../types/user.type';
import ConfigUserModal, { ConfigUserModalMethod } from '../components/modal';
import FilterConfigUser from '../components/filter';

type ConfigUserListContainerProps = {};

const ConfigUserListContainer: React.FC<ConfigUserListContainerProps> = () => {
  const optionsPagination = [
    { value: 25, label: '25 bản ghi' },
    { value: 50, label: '50 bản ghi' },
    { value: 100, label: '100 bản ghi' },
  ];
  const [users, setUsers] = useState<IUser[]>();

  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalDocs, setTotalDocs] = useState<number>(1);
  const urlParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const deleteRef = useRef<ConfigUserModalMethod>(null);

  const handleLimitChange = (data: any) => {
    setQuery({ ...query, _limit: data.value });
  };
  const [query, setQuery] = useState({
    _page: 1,
    _limit: 25,
    _sort: 'createdAt',
    _order: 'asc',
    search: '',
    _role: '',
  });
  const headings = [
    'Mã người dùng',
    'Tên người dùng',
    'Số điện thoại',
    'Email',
    'Chức danh',
    'Thao tác',
  ];
  const handlePageClick = (event: any) => {
    const page = event.selected + 1;
    setQuery({ ...query, _page: page });
  };

  const fetch = useCallback(() => {
    setLoading(true);
    getAllUser(query)
      .then((r) => {
        setLoading(false);
        setTotalPages(r.totalPages);
        setTotalDocs(r.totalDocs);
        setUsers(r.docs);
      })
      .catch((error) => console.log(error));
  }, [query]);

  useEffect(() => {
    urlParams.set('page', query._page as any);
    urlParams.set('limit', query._limit as any);
    fetch();
  }, [query, fetch]);

  const handleSearch = (e: any) => {
    setQuery({ ...query, search: e });
    if (e !== '') {
      urlParams.set('name', e);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete('name', e);
      navigate(`?${urlParams}`);
    }
  };
  const handleRoleChange = (selectedOpiton: any) => {
    setQuery({ ...query, _role: selectedOpiton.value });
    if (selectedOpiton.value !== '') {
      urlParams.set('role', selectedOpiton.value);
      navigate(`?${urlParams}`);
    } else {
      urlParams.delete('role');
      navigate(`?${urlParams}`);
    }
  };

  const gotoDetail = (item: any) => {
    navigate(`/configuration/user/${item?._id}/edit`);
  };

  return (
    <Layout>
      <Heading>Danh sách nhân viên</Heading>
      <FilterConfigUser
        handleSearch={handleSearch}
        handleRoleChange={handleRoleChange}
      />
      <div className='bg-white'>
        <Table headings={headings} loading={loading} length={users?.length}>
          {users?.map((item) => (
            <tr
              className='text-xs'
              key={item?._id}
              style={{ cursor: 'pointer' }}>
              <td onClick={() => gotoDetail(item)}>{item._id}</td>
              <td onClick={() => gotoDetail(item)}>{item?.name}</td>
              <td onClick={() => gotoDetail(item)}>{item?.phone}</td>
              <td onClick={() => gotoDetail(item)}>{item?.email}</td>
              <td onClick={() => gotoDetail(item)}>{item?.role}</td>
              <td>
                <div className='table-action'>
                  <div
                    className='button-nutri'
                    onClick={() => {
                      navigate(`/configuration/user/${item?._id}/edit`);
                    }}>
                    <img width={20} height={20} src={IconEdit} alt='edit' />
                  </div>
                  <button
                    className='button-nutri text-[#585858]'
                    onClick={() => deleteRef.current?.open(item?._id ?? '')}>
                    <IconTrash></IconTrash>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>
      <Pagination
        handlePageClick={handlePageClick}
        pageCount={totalPages}
        handleLimitChange={handleLimitChange}
        optionsPagination={optionsPagination}
        totalDocs={totalDocs}
        totalPages={totalPages}></Pagination>
      <ConfigUserModal onSuccess={fetch} ref={deleteRef} />
    </Layout>
  );
};

export default ConfigUserListContainer;
