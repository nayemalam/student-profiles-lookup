import { Input } from '@mui/material';
import React from 'react';
import { StudentProfile } from '../../types';
import Row from '../Row';

type Props = {
  profiles: StudentProfile[];
  setStudentProfiles: any;
};

const Container = ({ profiles, setStudentProfiles }: Props) => {
  const [search, setSearch] = React.useState<Record<string, string>>({
    name: '',
    tag: '',
  });
  const [filteredProfiles, setFilteredProfiles] = React.useState(profiles);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const tagRef = React.useRef<HTMLInputElement>(null);

  const filteredQueryByTag = (query: any): StudentProfile[] => {
    let filteredQuery: StudentProfile[] = [];

    filteredQuery = profiles.reduce((acc: StudentProfile[], profile) => {
      const filteredTags =
        query.length > 0
          ? profile.tags.filter(tag => tag.toLowerCase().includes(query))
          : [];

      if (filteredTags.length > 0) {
        acc.push(profile);
      }

      if (acc.length > 0) {
        return acc;
      } else if (acc.length === 0 && query.length > 0) {
        return [];
      } else {
        return profiles;
      }
    }, []);

    return filteredQuery;
  };

  const filteredQueryByName = (query: any): StudentProfile[] => {
    const filteredQuery: StudentProfile[] = profiles.filter(profile => {
      return (
        profile.firstName.toLowerCase().includes(query) ||
        profile.lastName.toLowerCase().includes(query) ||
        (profile.firstName + ' ' + profile.lastName)
          .toLowerCase()
          .includes(query)
      );
    });

    return filteredQuery;
  };

  const filterByQuery = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    let filteredQuery: StudentProfile[] = [];

    // listen for input changes
    const { name, value } = event.target;
    setSearch({
      ...search,
      [name]: value,
    });

    // update filtered query
    if (
      inputRef.current &&
      tagRef.current &&
      filteredQueryByName(inputRef.current.value).length > 0 &&
      filteredQueryByTag(tagRef.current.value).length > 0
      // check if filteredQueryByName and filteredQueryByTag are the same
    ) {
      let result = filteredQueryByName(inputRef.current.value).filter(o1 => {
        if (tagRef.current) {
          return filteredQueryByTag(tagRef.current.value).some(
            o2 => o1.id === o2.id,
          );
        }
        return false;
      });

      if (result) {
        filteredQuery = result;
      }
    } else {
      if (inputRef.current && name === 'name') {
        filteredQuery = filteredQueryByName(inputRef.current.value);
      }

      if (tagRef.current && name === 'tag') {
        filteredQuery = filteredQueryByTag(tagRef.current.value);
      }
    }

    setFilteredProfiles(filteredQuery);
  };

  return (
    <div className="container">
      <div className="search-field">
        <Input
          inputRef={inputRef}
          autoComplete="off"
          name="name"
          className="input"
          fullWidth
          onChange={evt => filterByQuery(evt)}
          inputProps={{ 'aria-label': 'search-name' }}
          placeholder="Search by name"
          value={search.name}
        />
      </div>
      <div className="search-field">
        <Input
          inputRef={tagRef}
          autoComplete="off"
          name="tag"
          className="input"
          fullWidth
          onChange={evt => filterByQuery(evt)}
          inputProps={{ 'aria-label': 'search-tag' }}
          placeholder="Search by tag"
          value={search.tag}
        />
      </div>
      <div className="profiles">
        {filteredProfiles.map((profile, index) => (
          <Row
            key={`${profile.firstName}-${index}`}
            profile={profile}
            profiles={profiles}
            setStudentProfiles={setStudentProfiles}
          />
        ))}
      </div>
    </div>
  );
};

export default Container;
