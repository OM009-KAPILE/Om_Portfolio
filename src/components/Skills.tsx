import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Code2, 
  Globe, 
  Cpu, 
  Database, 
  Layers
} from 'lucide-react';

export const Skills: React.FC = () => {
  const { data } = usePortfolio();
  const { skillCategories } = data;
  const [activeTab, setActiveTab] = useState<string>('all');

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'programming':
        return <Code2 className="w-5 h-5 text-teal-400" />;
      case 'web-dev':
        return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'ai-cv':
        return <Cpu className="w-5 h-5 text-teal-400" />;
      case 'databases-tools':
        return <Database className="w-5 h-5 text-cyan-400" />;
      default:
        return <Layers className="w-5 h-5 text-teal-400" />;
    }
  };

  const filteredCategories = activeTab === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.id === activeTab);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
              Technical Skills
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-2xl">
              Languages, frameworks, and developer tools I actively work with. No arbitrary percentage meters—just verifiable tools applied across projects.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                : 'bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200'
            }`}
          >
            All Categories ({skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)})
          </button>
          {skillCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === cat.id
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200'
              }`}
            >
              {cat.name} ({cat.skills.length})
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-slate-900/70 dark:bg-slate-900/70 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm hover:border-teal-500/30 transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800/60 dark:border-slate-800/60 light:border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-sm">
                    {getCategoryIcon(category.id)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 mt-0.5 line-clamp-1">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800/70 dark:bg-slate-800/70 light:bg-slate-100 text-teal-400 dark:text-teal-400 light:text-teal-700">
                  {category.skills.length} skills
                </span>
              </div>

              {/* Skills Badges Pill List */}
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="group inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 hover:border-teal-500/50 hover:text-teal-300 hover:bg-slate-900 dark:hover:bg-slate-900 light:hover:bg-slate-100 transition-all duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400/80 group-hover:bg-teal-400 group-hover:scale-125 transition-transform" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
