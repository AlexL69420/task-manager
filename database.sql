--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-07-18 20:17:45

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 852 (class 1247 OID 196830)
-- Name: task_category; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.task_category AS ENUM (
    'Bug',
    'Feature',
    'Documentation',
    'Refactor',
    'Test'
);


ALTER TYPE public.task_category OWNER TO postgres;

--
-- TOC entry 858 (class 1247 OID 196850)
-- Name: task_priority; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.task_priority AS ENUM (
    'Low',
    'Medium',
    'High'
);


ALTER TYPE public.task_priority OWNER TO postgres;

--
-- TOC entry 855 (class 1247 OID 196842)
-- Name: task_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.task_status AS ENUM (
    'To Do',
    'In Progress',
    'Done'
);


ALTER TYPE public.task_status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 196858)
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    category public.task_category NOT NULL,
    status public.task_status NOT NULL,
    priority public.task_priority NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- TOC entry 219 (class 1255 OID 196871)
-- Name: create_task(character varying, text, public.task_category, public.task_status, public.task_priority); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_task(p_title character varying, p_description text, p_category public.task_category, p_status public.task_status, p_priority public.task_priority) RETURNS public.tasks
    LANGUAGE plpgsql
    AS $$
DECLARE
  new_task tasks;
BEGIN
  INSERT INTO tasks (title, description, category, status, priority)
  VALUES (p_title, p_description, p_category, p_status, p_priority)
  RETURNING * INTO new_task;
  
  RETURN new_task;
END;
$$;


ALTER FUNCTION public.create_task(p_title character varying, p_description text, p_category public.task_category, p_status public.task_status, p_priority public.task_priority) OWNER TO postgres;

--
-- TOC entry 222 (class 1255 OID 196874)
-- Name: delete_task(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.delete_task(p_id integer) RETURNS public.tasks
    LANGUAGE plpgsql
    AS $$
DECLARE
  deleted_task tasks;
BEGIN
  DELETE FROM tasks 
  WHERE id = p_id
  RETURNING * INTO deleted_task;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Task with id % not found', p_id;
  END IF;
  
  RETURN deleted_task;
END;
$$;


ALTER FUNCTION public.delete_task(p_id integer) OWNER TO postgres;

--
-- TOC entry 223 (class 1255 OID 196876)
-- Name: get_all_active_tasks(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_all_active_tasks(p_limit integer DEFAULT 100, p_offset integer DEFAULT 0) RETURNS SETOF public.tasks
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM tasks
  ORDER BY created_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$;


ALTER FUNCTION public.get_all_active_tasks(p_limit integer, p_offset integer) OWNER TO postgres;

--
-- TOC entry 220 (class 1255 OID 196872)
-- Name: get_task_by_id(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_task_by_id(p_id integer) RETURNS public.tasks
    LANGUAGE plpgsql
    AS $$
DECLARE
  task_record tasks;
BEGIN
  SELECT * INTO task_record FROM tasks WHERE id = p_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Task with id % not found', p_id;
  END IF;
  
  RETURN task_record;
END;
$$;


ALTER FUNCTION public.get_task_by_id(p_id integer) OWNER TO postgres;

--
-- TOC entry 221 (class 1255 OID 196873)
-- Name: update_task(integer, character varying, text, public.task_category, public.task_status, public.task_priority); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_task(p_id integer, p_title character varying DEFAULT NULL::character varying, p_description text DEFAULT NULL::text, p_category public.task_category DEFAULT NULL::public.task_category, p_status public.task_status DEFAULT NULL::public.task_status, p_priority public.task_priority DEFAULT NULL::public.task_priority) RETURNS public.tasks
    LANGUAGE plpgsql
    AS $$
DECLARE
  updated_task tasks;
BEGIN
  UPDATE tasks
  SET 
    title = COALESCE(p_title, title),
    description = COALESCE(p_description, description),
    category = COALESCE(p_category, category),
    status = COALESCE(p_status, status),
    priority = COALESCE(p_priority, priority),
    updated_at = CURRENT_TIMESTAMP
  WHERE id = p_id
  RETURNING * INTO updated_task;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Task with id % not found', p_id;
  END IF;
  
  RETURN updated_task;
END;
$$;


ALTER FUNCTION public.update_task(p_id integer, p_title character varying, p_description text, p_category public.task_category, p_status public.task_status, p_priority public.task_priority) OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 196857)
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks_id_seq OWNER TO postgres;

--
-- TOC entry 4815 (class 0 OID 0)
-- Dependencies: 217
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- TOC entry 4655 (class 2604 OID 196861)
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- TOC entry 4809 (class 0 OID 196858)
-- Dependencies: 218
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, title, description, category, status, priority, created_at, updated_at) FROM stdin;
1	Fix login authentication	Users cannot login with correct credentials on mobile devices	Bug	In Progress	High	2025-07-16 14:08:40.785436+00	2025-07-16 14:08:40.785436+00
5	Add Redux	We need a state manager	Feature	To Do	Medium	2025-07-17 22:05:02.349044+00	2025-07-17 22:05:02.349044+00
9	Add dark mode	Add dark mode desc	Refactor	In Progress	Low	2025-07-17 23:05:04.905905+00	2025-07-17 23:05:04.905905+00
26	new task 2	new task 2 desc edited x2	Test	In Progress	Medium	2025-07-18 14:33:21.225913+00	2025-07-18 16:33:48.943081+00
24	new task 1	Lessgooo	Bug	To Do	Medium	2025-07-18 00:23:17.857906+00	2025-07-18 17:06:28.141063+00
\.


--
-- TOC entry 4816 (class 0 OID 0)
-- Dependencies: 217
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 26, true);


--
-- TOC entry 4662 (class 2606 OID 196867)
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- TOC entry 4658 (class 1259 OID 196870)
-- Name: idx_tasks_category; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tasks_category ON public.tasks USING btree (category);


--
-- TOC entry 4659 (class 1259 OID 196869)
-- Name: idx_tasks_priority; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tasks_priority ON public.tasks USING btree (priority);


--
-- TOC entry 4660 (class 1259 OID 196868)
-- Name: idx_tasks_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tasks_status ON public.tasks USING btree (status);


-- Completed on 2025-07-18 20:17:45

--
-- PostgreSQL database dump complete
--

