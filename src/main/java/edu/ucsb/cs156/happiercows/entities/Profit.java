package edu.ucsb.cs156.happiercows.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AccessLevel;
import lombok.Builder;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.JoinColumn;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "profits")

public class Profit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_commons_id")

    private long profit;
    private long timestamp;
    private UserCommons userCommons;
}