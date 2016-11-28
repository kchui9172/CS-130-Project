import Apartment from '../js/Apartment.js';

import { assert } from 'chai';

describe("Apartment", function() {
    it("can be converted from json", function() {
        var json = "{\"_aptID\":\"-KXc3TKTGn2MVIW3fqbR\",\"_tenants\":[\"jQlFVuLOLmUVVn20sLq5y1x9pzC2\",\"M8XJyl6bavb952DSa7MqbQUttFk2\",\"r0SYYxjvlSVUlDiuczenbqynh243\",\"2c6T10reEdRi5SYQdRMBEgDgeNo2\",\"JWrcvjerwSPhGJfxtMD8FLlRwP53\",\"dqHrqMWQa7XNWxPZtogQfKipg2z1\",\"fVryokUiKTRc0ovNwyLe8Xfzlge2\"],\"_messages\":[\"-KXc4QyY51Bp6Z_yDn9Y\",\"-KXcFVFbEh5atsQ_qC3B\",\"-KXcVmOdRTD6Xm3ZEGa2\",\"-KXcp0_PVlWgS_z50zN6\",\"-KXdlHB0Yt0o1lXpfowV\",\"-KXdo6EEGOshET9Q1-Jr\",\"-KXeP8Pqrlfs-n77qO7P\"],\"_chores\":[\"-KXc7FVW20C9jlh-y4i9\",\"-KXc7FawQ0E8SA6as_J0\",\"-KXc7Ffar6ZwZbsGFbko\",\"-KXc7FkgoaFPCDKpbG0r\",\"-KXc7Fp9cr-CUfxFXQUw\",\"-KXc7FtZZd2DLpe8wE7T\",\"-KXc7FxzZsLTRsi7d7B5\",\"-KXc7G1L6-QEcAsfKRMW\",\"-KXc7G5Xx5Ila5NI_JMs\",\"-KXc7GA0JJ-exgBDO6T9\",\"-KXc7GEHR86LOK_LJYM6\",\"-KXc7GIRaLFcruced9ja\",\"-KXc7GMp6ULTtXbm56Qq\",\"-KXdyx0U95og1ZXPTazU\",\"-KXdyx9uFagdqcqJe42S\",\"-KXeBHelkI-ipBhn8Jkk\",\"-KXeE8vFaF7sp7IpLHok\"],\"_address\":\"911 Charles E. Young Drive, Los Angeles, CA 90024\"}";
        var apartment = Apartment.JSONtoApartment(json);
        assert.equal("-KXc3TKTGn2MVIW3fqbR", apartment.getAptID());   
    });

    it("gets and sets address", function() {
        var apartment = new Apartment("address");
        assert.isOk(apartment);
        assert.equal("address", apartment.getAddress());
    });

    it("get and sets apartment id", function() {
        var apartment = new Apartment("address");
        assert.isNull(apartment.getAptID());
    });

    it("gets and updates messages", function() {
        var apartment = new Apartment("address");
        apartment.addMessage('1');
        assert.deepEqual(['1'], apartment.getMessageIDs());
    });

    it("gets and updates chores", function() {
        var apartment = new Apartment("address");
        apartment.addChore('1');
        assert.deepEqual(['1'], apartment.getChoreIDs());
    });
});
