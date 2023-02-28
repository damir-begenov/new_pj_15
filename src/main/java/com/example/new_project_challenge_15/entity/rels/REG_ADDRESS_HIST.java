package com.example.new_project_challenge_15.entity.rels;

import com.example.new_project_challenge_15.entity.Address;
import org.springframework.data.neo4j.core.schema.*;

@RelationshipProperties
@Node
public class REG_ADDRESS_HIST {
    @Id
    @GeneratedValue
    public Long id;
    public String Label;
    public String Source;
    @Property("Вид связи")
    public String Vid_svyaziey;
    @Property("Дата начала прописки")
    public String data_nachalo;
    @Property("Дата окончания прописки")
    public String data_oconchanya;
    @TargetNode
    private Address address;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return Label;
    }

    public void setLabel(String label) {
        Label = label;
    }

    public String getSource() {
        return Source;
    }

    public void setSource(String source) {
        Source = source;
    }

    public String getVid_svyaziey() {
        return Vid_svyaziey;
    }

    public void setVid_svyaziey(String vid_svyaziey) {
        Vid_svyaziey = vid_svyaziey;
    }

    public String getData_nachalo() {
        return data_nachalo;
    }

    public void setData_nachalo(String data_nachalo) {
        this.data_nachalo = data_nachalo;
    }

    public String getData_oconchanya() {
        return data_oconchanya;
    }

    public void setData_oconchanya(String data_oconchanya) {
        this.data_oconchanya = data_oconchanya;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}