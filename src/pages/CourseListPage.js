import { useState } from 'react';
import ListPage from '../components/ListPage';
import Warn from '../components/Warn';
import CourseItem from '../components/CourseItem';
import { getCourses } from '../api';
import styles from './CourseListPage.module.css';
import searchBarStyles from '../components/SearchBar.module.css';
import searchIcon from '../assets/search.svg';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function CourseListPage() {
  const [searchParam, setSearchParam] = useSearchParams();
  const initKeyword = searchParam.get('keyword');
  console.log('init k', initKeyword);
  const [keyword, setKeyword] = useState(initKeyword ?? '');
  console.log('keyword', keyword);
  const courses = getCourses(initKeyword);

  const handleKeywordChange = (e) => setKeyword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 제출 버튼의 기본 기능
    // 인풋 값을 쿼리 파라메터로 가지고 GET 요청을 한다.
    // 자기자신이 검색을 처리하는 경우가 없다.
    // form은 POST로 전달한다.
    setSearchParam(keyword ? { keyword } : {});
  }

  return (
    <ListPage
      variant="catalog"
      title="모든 코스"
      description="자체 제작된 코스들로 기초를 쌓으세요."
    >
      <Helmet>
        <title>코스 목록 - 코드댓</title>
      </Helmet>
      <form onSubmit={handleSubmit} className={searchBarStyles.form}>
        <input
          name="keyword"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="검색으로 코스 찾기"
        ></input>
        <button type="submit">
          <img src={searchIcon} alt="검색" />
        </button>
      </form>

      <p className={styles.count}>총 {courses.length}개 코스</p>

      {initKeyword && courses.length === 0 ? (
        <Warn
          className={styles.emptyList}
          title="조건에 맞는 코스가 없어요."
          description="올바른 검색어가 맞는지 다시 한 번 확인해 주세요."
        />
      ) : (
        <div className={styles.courseList}>
          {courses.map((course) => (
            <Link key={course.id} to={`/courses/${course.slug}`}>
              <CourseItem key={course.id} course={course} />
            </Link>
          ))}
        </div>
      )}
    </ListPage>
  );
}

export default CourseListPage;
