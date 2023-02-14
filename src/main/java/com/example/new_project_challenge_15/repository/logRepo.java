package com.example.new_project_challenge_15.repository;

import com.example.new_project_challenge_15.entity.log;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface logRepo extends JpaRepository<log,Long> {
    @Query(value = "SELECT * FROM public.log where username like ?1", nativeQuery = true)
    List<log> findByUsername(String username);

    @Query(value = "SELECT COUNT(*) FROM public.log where username like ?1", nativeQuery = true)
    Integer findNumberOfRequests(String username);

    @Query(value = "select * FROM public.log where username like ?1 order by date desc limit 1", nativeQuery = true)
    log findLastDate(String username);

    @Query(value = "select count(*) from public.log where username like ?1 and to_char(date, 'YYYY-MM-dd') = to_char(NOW(), 'YYYY-MM-dd')", nativeQuery = true)
    Integer findTodayRequestNum(String username);
}
