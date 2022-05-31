package edu.ucsb.cs156.happiercows.repositories.jobs;

import edu.ucsb.cs156.happiercows.entities.jobs.Job;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobsRepository extends CrudRepository<Job, Long> {

}
