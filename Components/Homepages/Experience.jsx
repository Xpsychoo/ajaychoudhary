import React from 'react';
import { CalendarDays, MapPin } from 'lucide-react';
import { experience, careerMonths } from '@/data/experience';
import { formatDuration, formatMonth, monthsBetween, useNow } from '@/utils/experience';

const Experience = () => {
    const durations = useNow((now) => ({
        total: careerMonths(now),
        roles: experience.map(({ start, end }) => monthsBetween(start, end, now)),
    }));

    return (
        <div className="container">
            <div className="main-head">
                <h3 className="head text-center">
                    <span className="text-green">Work</span> Experience
                </h3>
                <h5 className="sub_head text-center">
                    {formatDuration(durations.total)} <span className="text-green text-cursive">of building for the web</span>
                </h5>
            </div>

            <ol className="ExperienceTimeline">
                {experience.map((job, i) => (
                    <li key={`${job.company}-${job.start}`} className="experienceItem">
                        <span className={`timelineDot ${job.end ? '' : 'current'}`} aria-hidden="true" />
                        <article className="experienceCard">
                            <header className="cardHeader">
                                <div>
                                    <h4 className="role">{job.role}</h4>
                                    <div className="company">
                                        {job.company} <span className="muted">· {job.type}</span>
                                    </div>
                                </div>
                                <div className="period">
                                    <span className="dates">
                                        <CalendarDays aria-hidden="true" />
                                        {formatMonth(job.start)} – {formatMonth(job.end)}
                                    </span>
                                    <span className="duration">{formatDuration(durations.roles[i])}</span>
                                </div>
                            </header>
                            <div className="location">
                                <MapPin aria-hidden="true" />
                                {job.location}
                            </div>
                            <ul className="highlights">
                                {job.highlights.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                            <ul className="tags">
                                {job.skills.map((skill) => (
                                    <li key={skill} className="tag">{skill}</li>
                                ))}
                            </ul>
                        </article>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Experience;
