import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import Container from '../components/Container';
import { getStudentProfiles } from '../services';
import { StudentProfile, Students } from '../types';

const Main = () => {
  const [studentProfiles, setStudentProfiles] = React.useState<
    StudentProfile[]
  >([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    let isMounted: boolean = true;
    const fetchStudentProfiles = async () => {
      try {
        const data: Students = await getStudentProfiles();
        if (isMounted) {
          // set default tags attribute
          data.students.forEach(student => {
            student.tags = [];
          });
          setStudentProfiles(data.students);
        }
      } catch (error) {
        toast.error((error as { message: string }).message);
      }
      setIsLoading(false);
      isMounted = false;
    };

    fetchStudentProfiles();
  }, []);

  return (
    <div className="main">
      {isLoading ? (
        <CircularProgress className="loading" />
      ) : (
        <>
          <Container
            profiles={studentProfiles}
            setStudentProfiles={setStudentProfiles}
          />
        </>
      )}
    </div>
  );
};

export default Main;
