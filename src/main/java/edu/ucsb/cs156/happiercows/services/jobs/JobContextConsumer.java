package edu.ucsb.cs156.happiercows.services.jobs;

@FunctionalInterface
public interface JobContextConsumer {
  void accept(JobContext c) throws Exception;
}
