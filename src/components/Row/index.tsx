import { Avatar, Input } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import { getGradeAverage } from '../../helpers';
import { StudentProfile } from '../../types';

type Props = {
  profile: StudentProfile;
  profiles: StudentProfile[];
  setStudentProfiles: any;
};

const Row = ({ profile, profiles, setStudentProfiles }: Props) => {
  const [isExpanding, setIsExpanding] = React.useState<boolean>(false);
  const [tag, setTag] = React.useState<string>('');
  const [filteredTags, setFilteredTags] = React.useState<string[]>(
    profile.tags,
  );

  const onAddTag = (
    event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    event.stopPropagation();

    if (event.key === 'Enter') {
      // reset input
      setTag('');

      // if tag already exist
      if (filteredTags.includes(tag)) {
        toast.warn(`'${tag}' already exists`);
      }

      setFilteredTags(Array.from(new Set([...filteredTags, tag])));

      const matchedProfile = profiles.find(
        studentProfile =>
          studentProfile.id === profile.id &&
          studentProfile.firstName === profile.firstName,
      );

      if (matchedProfile) {
        // update the same profile in the state
        setStudentProfiles(
          profiles.map(studentProfile => {
            if (studentProfile.id === profile.id) {
              return {
                ...studentProfile,
                tags: [...matchedProfile.tags, ...filteredTags],
              };
            }
            return studentProfile;
          }),
        );
      }
    }
  };

  return (
    <div className="row">
      <div className="avatar">
        {profile.pic && (
          <Avatar
            src={profile.pic}
            alt={profile.firstName}
            style={{
              width: 110,
              height: 110,
              border: '0.1px solid lightgray',
            }}
          />
        )}
      </div>
      <div className="description">
        <div className="name-container">
          <h1 className="name">
            {profile.firstName} {profile.lastName}
          </h1>
          <button
            style={{
              marginTop: isExpanding ? '8px' : '10px',
            }}
            className="tests-button-toggle"
            onClick={() => setIsExpanding(!isExpanding)}
          >
            {isExpanding ? '-' : '+'}
          </button>
        </div>
        <div className="stats">
          <ul>
            <li className="email">Email: {profile.email}</li>
            <li className="company">Company: {profile.company}</li>
            <li className="skill">Skill: {profile.skill}</li>
            <li className="average">
              Average: {getGradeAverage(profile.grades)}%
            </li>
            {isExpanding && (
              <ul className="grades">
                {profile.grades.map((grade, index) => (
                  <li key={`${grade}-${index}`}>
                    <span className="test-index">Test {index}:</span>{' '}
                    <span>{grade}%</span>
                  </li>
                ))}
              </ul>
            )}
            <li className="tag">
              <div className="tags-container">
                {filteredTags.map((tag, index) => (
                  <div key={`${tag}-${index}`} className="tag-chip">
                    {tag}
                  </div>
                ))}
              </div>
              <Input
                autoComplete="off"
                name="tag"
                className="add-tag-search-field"
                fullWidth
                onChange={event => setTag(event.target.value)}
                onKeyDown={evt => onAddTag(evt)}
                inputProps={{ 'aria-label': 'add-tag' }}
                placeholder="Add a tag"
                value={tag}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Row;
